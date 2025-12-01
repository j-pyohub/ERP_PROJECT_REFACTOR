// /js/storeItem.js
(function ($) {
    'use strict';

    // ===== 기본 상수 =====
    const PAGE_SIZE = 10;            // 본문 목록 크기(서버 페이징)
    const STORE_ROWS_PER_PAGE = 5;   // 모달 목록 5행 고정

    $(function () {
        // ===== 화면 구분 =====
        const $body = $('body');
        const role = String($body.data('role') || 'STORE').toUpperCase();
        const IS_MANAGER_SCREEN = role === 'MANAGER';

        // 직영점 화면에서만 필요: body data-store-no (Thymeleaf에서 주입)
        let STORE_NO = null;
        if (!IS_MANAGER_SCREEN) {
            const sNo = $body.data('storeNo');
            if (sNo !== undefined && sNo !== null && sNo !== '') {
                STORE_NO = parseInt(sNo, 10);
            }
        }

        // 본사 화면에서만 사용
        let selectedStoreNo = null;
        let selectedStoreName = '';

        // ===== 모달 인스턴스 =====
        let limitModalInstance = null;
        let disposeModalInstance = null;
        let storeSearchModalInstance = null;

        // ===== 공통 유틸 =====
        function normalizeSearchType(v) {
            if (!v) return null;
            const up = String(v).toUpperCase();
            if (up === 'ITEM_NAME' || up === 'NAME') return 'NAME';
            if (up === 'ITEM_CODE' || up === 'CODE') return 'CODE';
            return null;
        }

        function markLowRows() {
            $('#stockTableBody tr').each(function () {
                const cur = Number($(this).data('currentqty')) || 0;
                const lim = Number($(this).data('limit')) || 0;
                const $cell = $(this).find('.cell-current');
                if (cur < lim && lim > 0) {
                    $cell.addClass('text-danger fw-bold');
                } else {
                    $cell.removeClass('text-danger fw-bold');
                }
            });
        }

        function toggleOverlayByStoreSelection() {
            const $overlay = $('#storeNoticeOverlay');
            if (!$overlay.length) return;
            const on = IS_MANAGER_SCREEN ? !!selectedStoreNo : !!STORE_NO;
            if (on) $overlay.removeClass('d-flex').addClass('d-none');
            else    $overlay.removeClass('d-none').addClass('d-flex');
        }

        // ===== 하한선 입력 검증 & 환산 =====
        function validateLimitInput() {
            const val = $('#limitNew').val();
            const $err = $('#limitErrorText');
            const $btn = $('#btnSaveLimit');

            if (!val) { // 빈값 → 하한선 삭제 의도 허용
                $err.addClass('d-none');
                $btn.prop('disabled', false);
                return;
            }
            const num = Number(val);
            if (isNaN(num) || num <= 0) {
                $err.removeClass('d-none');
                $btn.prop('disabled', true);
            } else {
                $err.addClass('d-none');
                $btn.prop('disabled', false);
            }
        }
        $(document).on('input', '#limitNew', validateLimitInput);

        // 공급단위 → 재고단위 환산 (품목별 convertStock 사용)
        $(document).on('change', '#limitUseSupply', function () {
            const on = this.checked;
            $('#limitSupplyCount').prop('disabled', !on);
            if (on) {
                $('#limitSupplyCount').trigger('input');
            } else {
                $('#limitSupplyCount').val('');
                $('#limitNew').val('').trigger('input');
            }
        });

        $(document).on('input', '#limitSupplyCount', function () {
            const boxes = parseFloat(this.value) || 0;
            const convert = Number($('#limitModal').data('convertstock')) || 1; // 품목별
            $('#limitNew').val(boxes * convert).trigger('input');
        });

        // ===== 하한선 설정 모달 열기 =====
        function openLimitModal($row) {
            if (!$row || !$row.length) return;

            const storeName    = $row.data('storename') || '';
            const itemName     = $row.data('itemname') || '';
            const rawLimit     = $row.data('limit');
            const unit         = $row.data('unit') || '';
            const owner        = (String($row.data('owner') || 'NONE')).toUpperCase();
            const storeItemNo  = $row.data('storeitemno');
            const convertStock = Number($row.data('convertstock')) || 1;

            // 본사화면에만 직영점명 표시
            $('#limitStoreName').text(IS_MANAGER_SCREEN ? storeName : '');
            $('#limitItemName').text(itemName);

            if (rawLimit === undefined || rawLimit === null || rawLimit === '') {
                $('#limitCurrentText').text('설정 없음');
            } else {
                const limNum = Number(rawLimit);
                $('#limitCurrentText').text(limNum.toLocaleString() + ' ' + unit);
            }

            if (owner === 'MANAGER') {
                $('#limitOwnerText').text('본사에서 설정한 하한선입니다.');
            } else if (owner === 'STORE') {
                $('#limitOwnerText').text('직영점에서 설정한 하한선입니다.');
            } else {
                $('#limitOwnerText').text('현재 설정된 하한선이 없습니다.');
            }

            $('#limitNew').val('').prop('disabled', false);
            $('#limitUnit2').text(unit);

            // 품목별 환산값 세팅
            $('#limitModal').data('convertstock', convertStock);
            $('#limitUseSupply').prop('checked', false).prop('disabled', false);
            $('#limitSupplyCount').prop('disabled', true).val('');
            $('#limitSupplyUnit').text('box');
            $('#limitConvertInfo').text(`※ 1 box = ${convertStock} ${unit}`);

            $('#limitErrorText').addClass('d-none');
            $('#btnSaveLimit').prop('disabled', false);
            $('#limitModal').data('storeItemNo', storeItemNo);

            if (!limitModalInstance) {
                const modalEl = document.getElementById('limitModal');
                if (!modalEl) return;
                limitModalInstance = new bootstrap.Modal(modalEl);
            }
            limitModalInstance.show();
        }

        // 아이콘 클릭으로 열기
        $(document).on('click', '.btn-open-limit', function () {
            openLimitModal($(this).closest('tr'));
        });

        // ===== 하한선 저장 =====
        $(document).on('click', '#btnSaveLimit', function () {
            const $modal = $('#limitModal');
            const storeItemNo = $modal.data('storeItemNo');
            if (!storeItemNo) { alert('선택된 품목 정보가 없습니다.'); return; }

            const val = $('#limitNew').val().trim();
            let newLimit = null;
            if (val !== '') {
                const num = Number(val);
                if (isNaN(num) || num <= 0) return; // validateLimitInput가 이미 막음
                newLimit = num;
            }

            const params = new URLSearchParams();
            if (newLimit !== null) params.append('newLimit', newLimit);
            params.append('isManagerRole', IS_MANAGER_SCREEN ? 'true' : 'false');

            fetch(`/stock/storeItem/${storeItemNo}/limit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: params.toString(),
                credentials: 'same-origin'
            })
                .then(res => {
                    if (!res.ok) throw new Error('하한선 저장 실패');
                    // 테이블 해당 행 갱신
                    const $row = $('#stockTableBody tr').filter(function () {
                        return String($(this).data('storeitemno')) === String(storeItemNo);
                    });
                    if ($row.length) {
                        $row.data('limit', newLimit || '');
                        const unit = $row.data('unit') || '';
                        const text = (newLimit == null) ? '-' : newLimit.toLocaleString() + ' ' + unit;
                        $row.find('.cell-limit').contents().filter(function () {
                            return this.nodeType === Node.TEXT_NODE;
                        }).first().replaceWith(text + ' ');
                    }
                    markLowRows();
                    if (limitModalInstance) limitModalInstance.hide();
                })
                .catch(err => {
                    console.error(err);
                    alert('하한선 저장 중 오류가 발생했습니다.');
                });
        });

        // ===== (직영점 전용) 폐기 모달 =====
        function openDisposeModal($row) {
            if (IS_MANAGER_SCREEN) return;
            if (!$row || !$row.length) return;

            const itemName   = $row.data('itemname') || '';
            const currentQty = Number($row.data('currentqty')) || 0;
            const unit       = $row.data('unit') || '';

            $('#disposeItemName').text(itemName);
            $('#disposeCurrentQtyText').text(currentQty.toLocaleString() + ' ' + unit);
            $('#disposeQty').val('');
            $('#disposeReason').val('');

            if (!disposeModalInstance) {
                const modalEl = document.getElementById('disposeModal');
                if (!modalEl) { alert('폐기 모달이 없습니다.'); return; }
                disposeModalInstance = new bootstrap.Modal(modalEl);
            }
            disposeModalInstance.show();
        }
        $(document).on('click', '.btn-open-dispose', function () {
            if (!IS_MANAGER_SCREEN) openDisposeModal($(this).closest('tr'));
        });

        // ===== 상세보기 버튼 =====
        $(document).on('click', '.btn-detail', function () {
            window.location.href = '/item/detail'; // TODO: 실제 상세 URL
        });

        // ===== 테이블 렌더링 =====
        function buildRowHtml(item) {
            // limitQuantity(혹은 finalLimit) + owner, convertStock(품목별)
            const limitVal = (item.limitQuantity !== undefined && item.limitQuantity !== null)
                ? item.limitQuantity
                : (item.finalLimit !== undefined ? item.finalLimit : null);

            const convertStock = Number(item.convertStock) || 1;
            const unit = item.stockUnit || '';
            const limitText = (limitVal != null) ? (Number(limitVal).toLocaleString() + ' ' + unit) : '-';
            const currentText = (Number(item.currentQuantity || 0).toLocaleString() + ' ' + unit);
            const owner = (item.limitOwnerType || item.limitOwner || 'NONE');

            if (IS_MANAGER_SCREEN) {
                return `
<tr
  data-storeitemno="${item.storeItemNo}"
  data-storename="${item.storeName || ''}"
  data-itemname="${item.itemName || ''}"
  data-category="${item.itemCategory || ''}"
  data-currentqty="${item.currentQuantity || 0}"
  data-unit="${unit}"
  data-limit="${limitVal != null ? limitVal : ''}"
  data-owner="${owner}"
  data-convertstock="${convertStock}"
>
  <td>${item.storeName || ''}</td>
  <td class="text-code">${item.itemCode || ''}</td>
  <td>${item.itemName || ''}</td>
  <td>${item.itemCategory || ''}</td>
  <td class="text-qty cell-limit">
    ${limitText}
    <button type="button" class="icon-btn btn-open-limit" title="하한선 설정">
      <i class="bi bi-gear limit-gear"></i>
    </button>
  </td>
  <td class="text-qty cell-current">${currentText}</td>
  <td class="text-center">
    <button type="button" class="icon-btn btn-detail" title="상세보기">
      <i class="bi bi-file-earmark-text"></i>
    </button>
  </td>
</tr>`;
            } else {
                // 직영점 화면 테이블 (storeName 칼럼 없음)
                return `
<tr
  data-storeitemno="${item.storeItemNo}"
  data-itemname="${item.itemName || ''}"
  data-category="${item.itemCategory || ''}"
  data-currentqty="${item.currentQuantity || 0}"
  data-unit="${unit}"
  data-limit="${limitVal != null ? limitVal : ''}"
  data-owner="${owner}"
  data-convertstock="${convertStock}"
>
  <td class="text-code">${item.itemCode || ''}</td>
  <td>${item.itemName || ''}</td>
  <td>${item.itemCategory || ''}</td>
  <td class="text-qty cell-limit">
    ${limitText}
    <button type="button" class="icon-btn btn-open-limit" title="하한선 설정">
      <i class="bi bi-gear limit-gear"></i>
    </button>
  </td>
  <td class="text-qty cell-current">
    ${currentText}
    <button type="button" class="icon-btn btn-open-dispose" title="폐기 등록">
      <i class="bi bi-trash3"></i>
    </button>
  </td>
  <td class="text-center">
    <button type="button" class="icon-btn btn-detail" title="상세보기">
      <i class="bi bi-file-earmark-text"></i>
    </button>
  </td>
</tr>`;
            }
        }

        function renderTable(pageData) {
            const $tbody = $('#stockTableBody').empty();
            const colSpan = IS_MANAGER_SCREEN ? 7 : 6;

            if (!pageData || !pageData.content || pageData.content.length === 0) {
                $tbody.append(`<tr><td colspan="${colSpan}" class="text-center text-muted py-4">조회 결과가 없습니다.</td></tr>`);
                return;
            }
            pageData.content.forEach(item => $tbody.append(buildRowHtml(item)));
            markLowRows();
        }

        // ① 페이저 렌더 (교체)
        function renderPager(pageData) {
            const $pager = $('#mainPager').empty();
            if (!pageData || pageData.totalPages === 0) return;

            const totalPages = pageData.totalPages;
            const current = (pageData.page || 0) + 1;  // 1-base
            const start   = pageData.startPage || 1;
            const end     = pageData.endPage   || totalPages;
            const hasPrevBlock = !!pageData.hasPrevBlock;
            const hasNextBlock = !!pageData.hasNextBlock;

            function add(label, target, extraClass='') {
                $pager.append(
                    `<li class="page-item ${extraClass}">
         <a class="page-link" href="#" data-page="${target}">${label}</a>
       </li>`
                );
            }
            // <<, <
            add('«', 'first',  (current === 1 ? 'disabled' : ''));
            add('‹', 'prev',   (!hasPrevBlock && current === 1 ? 'disabled' : ''));

            // 숫자
            for (let p = start; p <= end; p++) {
                add(String(p), p, (p === current ? 'active' : ''));
            }

            // >, >>
            add('›', 'next',   (!hasNextBlock && current === totalPages ? 'disabled' : ''));
            add('»', 'last',   (current === totalPages ? 'disabled' : ''));
        }

// ② 클릭 핸들러 (교체)
        $(document).on('click', '#mainPager a.page-link', function (e) {
            e.preventDefault();
            const $li = $(this).parent();
            if ($li.hasClass('disabled') || $li.hasClass('active')) return;

            const act = $(this).data('page');
            const cur = $('#mainPager .active a.page-link').data('page') || 1;

            // 현재 블록 범위 읽기
            const $nums = $('#mainPager a.page-link').filter(function(){
                const t = $(this).data('page'); return /^\d+$/.test(String(t));
            });
            const start = Number($nums.first().data('page')) || 1;
            const end   = Number($nums.last().data('page'))  || start;

            let go = 1;
            if (act === 'first') go = 1;
            else if (act === 'last') {
                const lastNum = $('#mainPager a.page-link').filter(function(){
                    return /^\d+$/.test(String($(this).data('page')));
                }).last().data('page');
                // lastNum은 현재 블록의 마지막이므로, 안전하게 totalPages 대신 서버 재호출 시 업데이트됨
                go = lastNum;
            }
            else if (act === 'prev') go = Math.max(1, start - 1);
            else if (act === 'next') go = end + 1;
            else go = parseInt(act, 10);

            loadPage(go);
        });

        // ===== 서버 목록 로딩 =====
        function loadPage(pageNumber1Base) {
            const page = Math.max(1, Number(pageNumber1Base) || 1); // UI는 1-base

            if (IS_MANAGER_SCREEN) {
                if (!selectedStoreNo) { alert('먼저 직영점을 선택해 주세요.'); return; }
            } else {
                if (!STORE_NO) { console.error('STORE_NO가 설정되지 않았습니다.'); return; }
            }

            const category   = $('#categorySelect').val();
            const rawType    = $('#searchTypeSelect').val();
            const searchType = normalizeSearchType(rawType);
            const keyword    = ($('#searchKeyword').val() || '').trim();

            const params = new URLSearchParams();
            params.append('storeNo', IS_MANAGER_SCREEN ? selectedStoreNo : STORE_NO);
            params.append('size', PAGE_SIZE);
            if (category) params.append('category', category);
            if (keyword && searchType) {
                params.append('searchType', searchType);
                params.append('keyword', keyword);
            }

            const baseUrl = IS_MANAGER_SCREEN
                ? '/stock/storeItem/manager/list/'
                : '/stock/storeItem/store/list/';

            fetch(baseUrl + page + '?' + params.toString(), { credentials: 'same-origin' })
                .then(res => { if (!res.ok) throw new Error('목록 조회 실패'); return res.json(); })
                .then(data => {
                    renderTable(data); renderPager(data); })
                .catch(err => {
                    console.error(err);
                    alert('재고 목록 조회 중 오류가 발생했습니다.');
                });
        }

        // ===== 조회/초기화 & 페이지네이션 바인딩 =====
        $('#btnSearchExec').on('click', function () {
            if (IS_MANAGER_SCREEN && !selectedStoreNo) { alert('먼저 직영점을 선택해 주세요.'); return; }
            loadPage(1);
        });

        $('#btnResetFilter').on('click', function () {
            $('#categorySelect').val('');
            // 서비스가 NAME/CODE를 기대하므로 기본 NAME으로
            $('#searchTypeSelect').val('NAME');
            $('#searchKeyword').val('');
            if (IS_MANAGER_SCREEN) {
                if (selectedStoreNo) loadPage(1);
            } else {
                if (STORE_NO) loadPage(1);
            }
        });

        $(document).on('click', '#mainPager a.page-link', function (e) {
            e.preventDefault();
            const $li = $(this).parent();
            if ($li.hasClass('disabled') || $li.hasClass('active')) return;
            const page = parseInt($(this).data('page'), 10);
            if (!isNaN(page)) loadPage(page);
        });

        // ===== 본사 전용: 직영점 검색 모달 =====
        if (IS_MANAGER_SCREEN && $('#storeSearchModal').length) {
            let storeList = [];
            let storeTotalPages = 1;
            let storeCurrentPage = 1;

            async function fetchStores(keyword) {
                const qs = keyword ? ('?keyword=' + encodeURIComponent(keyword)) : '';
                const res = await fetch('/storeSearch/modal' + qs, { credentials: 'same-origin' });
                if (!res.ok) throw new Error('직영점 조회 실패');
                return await res.json(); // List<StoreDTO>
            }

            const getRegion = (addr) => {
                if (!addr) return '-';
                const parts = String(addr).trim().split(/\s+/);
                return parts.slice(0, 2).join(' ') || '-';
            };

            function rebuildStorePager() {
                const $pager = $('#storeModalPager').empty();
                if (!storeList || storeList.length === 0) return;

                storeTotalPages = Math.max(1, Math.ceil(storeList.length / STORE_ROWS_PER_PAGE));

                function li(data, text) {
                    return $('<li class="page-item"><a class="page-link" href="#"></a></li>')
                        .find('a').attr('data-page', data).html(text).end();
                }
                $pager.append(li('first', '&laquo;'));
                $pager.append(li('prev', '&lsaquo;'));
                for (let i = 1; i <= storeTotalPages; i++) $pager.append(li(String(i), String(i)));
                $pager.append(li('next', '&rsaquo;'));
                $pager.append(li('last', '&raquo;'));

                paintStorePager();
            }

            function paintStorePager() {
                const $pager = $('#storeModalPager');
                $pager.find('.page-item').removeClass('active disabled');
                $pager.find(`a[data-page="${storeCurrentPage}"]`).parent().addClass('active');

                function disable(key) { $pager.find(`a[data-page="${key}"]`).parent().addClass('disabled'); }
                if (storeCurrentPage === 1) { disable('first'); disable('prev'); }
                if (storeCurrentPage === storeTotalPages) { disable('last'); disable('next'); }
            }

            function renderStoreRows() {
                const $tb = $('#storeModalTableBody').empty();
                if (!storeList || storeList.length === 0) {
                    $tb.append('<tr><td colspan="3" class="text-center text-muted py-3">직영점이 없습니다.</td></tr>');
                    return;
                }
                const s = (storeCurrentPage - 1) * STORE_ROWS_PER_PAGE;
                const e = s + STORE_ROWS_PER_PAGE;
                storeList.slice(s, e).forEach(sv => {
                    $tb.append(`
<tr>
  <td>${sv.storeName}</td>
  <td>${getRegion(sv.address)}</td>
  <td class="text-center">
    <button type="button" class="btn btn-warning btn-sm btn-select-store"
            data-storeno="${sv.storeNo}" data-store="${sv.storeName}">
      선택
    </button>
  </td>
</tr>`);
                });
            }

            async function openStoreSearchModalWith(keywordFromMainInput) {
                if (!storeSearchModalInstance) {
                    const modalEl = document.getElementById('storeSearchModal');
                    if (!modalEl) return;
                    storeSearchModalInstance = new bootstrap.Modal(modalEl);
                }
                $('#storeSearchInput').val(keywordFromMainInput || '');
                try {
                    storeList = await fetchStores(keywordFromMainInput || '');
                } catch (e) {
                    console.error(e);
                    storeList = [];
                }
                storeCurrentPage = 1;
                rebuildStorePager();
                renderStoreRows();
                storeSearchModalInstance.show();
            }

            // 열기
            $('#btnOpenStoreSearch').on('click', function () {
                openStoreSearchModalWith($('#storeSearchKeyword').val() || '');
            });

            // 검색
            $(document).on('click', '#btnSearchStoreExec', async function () {
                try {
                    storeList = await fetchStores($('#storeSearchInput').val() || '');
                } catch (e) { console.error(e); storeList = []; }
                storeCurrentPage = 1;
                rebuildStorePager();
                renderStoreRows();
            });

            // 초기화
            $(document).on('click', '#btnSearchStoreReset', async function () {
                $('#storeSearchInput').val('');
                try {
                    storeList = await fetchStores('');
                } catch (e) { console.error(e); storeList = []; }
                storeCurrentPage = 1;
                rebuildStorePager();
                renderStoreRows();
            });

            // Enter
            $(document).on('keydown', '#storeSearchInput', async function (e) {
                if (e.key !== 'Enter') return;
                try {
                    storeList = await fetchStores($(this).val() || '');
                } catch (e1) { console.error(e1); storeList = []; }
                storeCurrentPage = 1;
                rebuildStorePager();
                renderStoreRows();
            });

            // 모달 페이지 이동
            $(document).on('click', '#storeModalPager a.page-link', function (e) {
                e.preventDefault();
                const act = $(this).data('page');
                const $li = $(this).parent();
                if ($li.hasClass('disabled') || $li.hasClass('active')) return;

                if (act === 'first') storeCurrentPage = 1;
                else if (act === 'prev') storeCurrentPage = Math.max(1, storeCurrentPage - 1);
                else if (act === 'next') storeCurrentPage = Math.min(storeTotalPages, storeCurrentPage + 1);
                else if (act === 'last') storeCurrentPage = storeTotalPages;
                else {
                    const n = parseInt(act, 10);
                    if (!isNaN(n)) storeCurrentPage = n;
                }
                paintStorePager();
                renderStoreRows();
            });

            // 선택 → 메인 인풋/오버레이/목록
            $(document).on('click', '#storeModalTableBody .btn-select-store', function () {
                const storeNo   = $(this).data('storeno');
                const storeName = $(this).data('store');

                selectedStoreNo = storeNo;
                selectedStoreName = storeName;

                $('#storeSearchKeyword').val(storeName).trigger('input');
                toggleOverlayByStoreSelection();

                if (storeSearchModalInstance) storeSearchModalInstance.hide();
                if (storeNo) loadPage(1);
            });

            // 메인 인풋 수동 변경 시에도 오버레이 동기화(이름을 비웠을 때 다시 표시)
            $('#storeSearchKeyword').on('input change', function () {
                // 이름만 바꾼 경우 selectedStoreNo는 그대로일 수 있음 → 이름이 비워지면 선택 해제 처리
                if (!$.trim($(this).val())) selectedStoreNo = null;
                toggleOverlayByStoreSelection();
            });
        }

        // 첫 진입 로딩
        toggleOverlayByStoreSelection();
        if (!IS_MANAGER_SCREEN && STORE_NO) {
            loadPage(1);
        }
    });
})(jQuery);
