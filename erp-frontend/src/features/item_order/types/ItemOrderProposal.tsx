export interface ItemOrderProposal {
    proposalNo: number;
    managerNo: string;
    managerName: string;

    storeNo: number;
    storeName: string;

    itemNo: number;
    itemName: string;

    quantity: number;
    supplyUnit: string;
    reason: string;
    proposalDate: string;
    responseDate: string;
}