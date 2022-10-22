import LoanRepository from "../repository/LoanRepository";
import InstallmentRepository from "../repository/InstallmentRepository";

export default interface RepositoryAbstractFactory {
  createLoanRepository(): LoanRepository
  createInstallmentRepository(): InstallmentRepository
}