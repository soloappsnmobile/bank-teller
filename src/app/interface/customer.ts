export interface CustomerI {
    id: number
    name: string
    email: string
    phoneNumber: string
    image: string
    accounts: AccountI[]
}

export interface AccountI {
    id: number
    customerId: number
    accountNumber: string
    accountType: string
    balance: number
    
}

export interface TransactionI {
    id: number
    accountId: number
    info: InfoI[]
}

export interface InfoI {
    id: number
    accountId: number
    type: string
    amount: number
    date: string
}

