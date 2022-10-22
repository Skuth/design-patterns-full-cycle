import Usecase from "./Usecase"

import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory"

import LoanRepository from "../repository/LoanRepository"
import InstallmentRepository from "../repository/InstallmentRepository"

export default class GetLoan implements Usecase {
  loanRepository: LoanRepository
  installmentRepository: InstallmentRepository

  constructor (
    readonly repositoryAbstractFactory: RepositoryAbstractFactory
  ) {
    this.loanRepository = repositoryAbstractFactory.createLoanRepository()
    this.installmentRepository = repositoryAbstractFactory.createInstallmentRepository()
  }

  async execute(input: Input): Promise<Output> {
    const output: Output = {
      code: input.code,
      installments: []
    }

    const loan = await this.loanRepository.getByCode(input.code)
    const installments = await this.installmentRepository.getByCode(loan.code)

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