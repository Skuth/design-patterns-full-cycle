import LoanRepository from "../../../application/repository/LoanRepository";
import Loan from "../../../domain/entity/Loan";

export default class LoanMemoryRepository implements LoanRepository {
  loans: Loan[]
  static instance: LoanMemoryRepository

  private constructor() {
    this.loans = []
  }

  static getInstace() {
    if (!LoanMemoryRepository.instance) {
      LoanMemoryRepository.instance = new LoanMemoryRepository()
    }

    return LoanMemoryRepository.instance
  }

  async save(loan: Loan): Promise<void> {
    this.loans.push(loan)
  }
  
  async getByCode(code: string): Promise<Loan> {
    const loan = this.loans.find(loan => loan.code === code)

    if (!loan) {
      throw new Error()
    }

    return loan
  }
}