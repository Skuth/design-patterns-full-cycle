import Usecase from "./Usecase"

import LoanPrice from "../../domain/entity/LoanPrice"
import LoanSac from "../../domain/entity/LoanSac"

import Installment from "../../domain/entity/Installment"

export default class SimulateLoan implements Usecase {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      code: input.code,
      installments: []
    }

    const amount = input.purchasePrice - input.downPayment

    let installments: Installment[] = []

    if (input.type === "price") {
      const loan = new LoanPrice(
        input.code,
        amount,
        input.period,
        1,
        input.type,
        input.salary
      )

      installments = loan.generateInstallments()
    }

    if (input.type === "sac") {
      const loan = new LoanSac(
        input.code,
        amount,
        input.period,
        1,
        input.type,
        input.salary
      )

      installments = loan.generateInstallments()
    }

    for (const installment of installments) {
      output.installments.push({
        installmentNumber: installment.number,
        amount: installment.amount,
        interest: installment.interest,
        amortization: installment.amortization,
        balance: installment.balance
      })
    }

    return output
  }
}

type Input = {
  code: string
  purchasePrice: number
  downPayment: number
  salary: number
  period: number
  type: string
}

type Output = {
  code: string
  installments: {
    installmentNumber: number
    amount: number
    interest: number
    amortization: number
    balance: number
  }[]
}