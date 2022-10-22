import crypto from "crypto"

import LogDecorator from "../../src/application/decorator/LogDecorator"

import StartLoanApplication from "../../src/application/usecase/StartLoanApplication"
import GetLoan from "../../src/application/usecase/GetLoan"

import PgPromiseConnection from "../../src/infra/database/PgPromiseConnection"

// import RepositoryDatabaseFactory from "../../src/infra/factory/RepositoryDatabaseFactory"
import RepositoryMemoryFactory from "../../src/infra/factory/RepositoryMemoryFactory"

test("Deve aplicar para um financiamento utilizando a tabela price", async () => {
  const connection = new PgPromiseConnection()

  // const repositoryFactory = new RepositoryDatabaseFactory(
  //   connection
  // )

  const repositoryFactory = new RepositoryMemoryFactory()

  const startLoanApplication = new LogDecorator(new StartLoanApplication(
    repositoryFactory
  ))

  const code = crypto.randomUUID()

  const inputStartLoanApplication = {
    code: code,
    purchasePrice: 250000,
    downPayment: 50000,
    salary: 70000,
    period: 12,
    type: "price"
  }

  await startLoanApplication.execute(inputStartLoanApplication)

  const getLoan = new LogDecorator(new GetLoan(
    repositoryFactory
  ))

  const inputGetLoan = {
    code
  }

  const output = await getLoan.execute(inputGetLoan)

  expect(output.installments).toHaveLength(12)

  const [firstInstallment] = output.installments
  expect(firstInstallment.balance).toBe(184230.24)

  const lastInstallment = output.installments[output.installments.length - 1]
  expect(lastInstallment.balance).toBe(0)

  connection.close()
})