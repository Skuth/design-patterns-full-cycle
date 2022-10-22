import RepositoryAbstractFactory from "../../application/factory/RepositoryAbstractFactory";

import Connection from "../database/Connection";

import LoanDatabaseRepository from "../repository/LoanDatabaseRepository";
import InstallmentDatabaseRepository from "../repository/InstallmentDatabaseRepository";

import LoanRepository from "../../application/repository/LoanRepository";
import InstallmentRepository from "../../application/repository/InstallmentRepository";


export default class RepositoryDatabaseFactory implements RepositoryAbstractFactory {
  constructor(
    readonly connection: Connection
  ) {}

  createLoanRepository(): LoanRepository {
    return new LoanDatabaseRepository(this.connection)
  }
  createInstallmentRepository(): InstallmentRepository {
    return new InstallmentDatabaseRepository(this.connection)
  }

}