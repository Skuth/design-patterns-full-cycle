import Usecase from "./Usecase"

import InstallmentGeneratorFactory from "../../domain/factory/InstallmentGeneratorFactory"

import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory"

import LoanRepository from "../repository/LoanRepository"
import InstallmentRepository from "../repository/InstallmentRepository"

import Loan from "../../domain/entity/Loan"
import Installment from "../../domain/entity/Installment"

export default class StartLoanApplication implements Usecase {
  loanRepository: LoanRepository
  installmentRepository: InstallmentRepository

  constructor (
    readonly repositoryAbstractFactory: RepositoryAbstractFactory
  ) {
    this.loanRepository = repositoryAbstractFactory.createLoanRepository()
    this.installmentRepository = repositoryAbstractFactory.createInstallmentRepository()
  }

  async execute(input: Input): Promise<void> {

    const amount = input.purchasePrice - input.downPayment
    const rate = 1
    const loan = new Loan(
      input.code,
      amount,
      input.period,
      rate,
      input.type,
      input.salary
  )

    await this.loanRepository.save(loan)
    
    const installmentGenerator = InstallmentGeneratorFactory.create(input.type)
    const installments: Installment[] = installmentGenerator.generator(
      input.code,
      amount,
      input.period,
      rate
    )

    for (const installment of installments) {
      await this.installmentRepository.save(
        new Installment(
          input.code,
          installment.number,
          installment.amount,
          installment.interest,
          installment.amortization,
          installment.balance
        )
      )
    }
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