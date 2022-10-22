import Installment from "./Installment";

export default interface InstallmentGenerator {
  generator(
    code: string,
    amount: number,
    period: number,
    rate: number
  ): Installment[]
}