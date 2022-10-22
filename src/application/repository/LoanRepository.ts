import Loan from "../../domain/entity/Loan";

export default interface LoanRepository{
  save(loan: Loan): Promise<void>
  getByCode(code: string): Promise<Loan>
}