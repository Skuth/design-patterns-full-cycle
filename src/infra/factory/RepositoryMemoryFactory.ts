
import RepositoryAbstractFactory from "../../application/factory/RepositoryAbstractFactory";

import LoanMemoryRepository from "../repository/memory/LoanMemoryRepository";
import InstallmentMemoryRepository from "../repository/memory/InstallmentMemoryRepository";

import LoanRepository from "../../application/repository/LoanRepository";
import InstallmentRepository from "../../application/repository/InstallmentRepository";


export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {
  constructor() {}

  createLoanRepository(): LoanRepository {
    return LoanMemoryRepository.getInstace()
  }
  createInstallmentRepository(): InstallmentRepository {
    return InstallmentMemoryRepository.getInstace()
  }

}