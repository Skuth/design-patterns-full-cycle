import Installment from "./Installment";

export default abstract class Loan {
  constructor (
    readonly code: string,
    readonly amount: number,
    readonly period: number,
    readonly rate: number,
    readonly type: "price" | "sac" | any,
    readonly salary: number
  ) {
    if ((salary * 0.25) < (amount / period)) {
      throw new Error("Insufficient salary")
    }
  }

  abstract generateInstallments(): Installment[]
}