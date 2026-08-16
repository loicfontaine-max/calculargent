import assert from "node:assert/strict";
import test from "node:test";
import { buildScenarios, calculate, calculators } from "../lib/calculators.ts";

function close(actual, expected, tolerance = 0.5) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} n’est pas proche de ${expected}`);
}

test("exposes twelve unique calculators with bounded defaults", () => {
  assert.equal(calculators.length, 12);
  assert.equal(new Set(calculators.map(({ slug }) => slug)).size, 12);
  for (const calculator of calculators) {
    const values = Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue]));
    for (const field of calculator.fields) assert.ok(field.defaultValue >= field.min && field.defaultValue <= field.max);
    const result = calculate(calculator.slug, values);
    assert.ok(Number.isFinite(result.headline), `${calculator.slug} doit produire un résultat fini`);
    assert.equal(buildScenarios(calculator.slug, values).length, 3);
  }
});

test("calculates compound interest and a zero-rate savings goal", () => {
  close(calculate("interets-composes", { initial_capital: 10000, monthly_savings: 100, investment_horizon: 20, interest_rate: 5 }).headline, 68229.77, 0.1);
  close(calculate("objectif-epargne", { target: 12000, capital: 0, years: 1, rate: 0 }).headline, 1000);
});

test("calculates real return, emergency fund and net worth", () => {
  close(calculate("rendement-apres-inflation", { capital: 20000, gross_rate: 5, inflation: 2, years: 10 }).headline, 2.941, 0.01);
  assert.equal(calculate("fonds-urgence", { expenses: 1800, months: 4, current: 3000 }).headline, 7200);
  assert.equal(calculate("patrimoine-net", { cash: 15000, investments: 30000, property: 220000, debts: 145000 }).headline, 120000);
});

test("handles debt duration, insufficient payments and early repayment", () => {
  assert.equal(calculate("remboursement-dette", { balance: 12000, rate: 6, payment: 350 }).headline, 38);
  assert.equal(calculate("remboursement-dette", { balance: 12000, rate: 12, payment: 100 }).headline, Infinity);
  assert.ok(calculate("remboursement-anticipe", { balance: 18000, rate: 7, payment: 400, extra: 100 }).headline > 10);
  close(calculate("taux-endettement", { income: 3500, housing: 900, loans: 200 }).headline, 31.428, 0.01);
});

test("calculates independence, loan payment, budget and savings comparison", () => {
  assert.equal(calculate("independance-financiere", { monthly_expenses: 2500, withdrawal_rate: 4, current_portfolio: 100000 }).headline, 750000);
  close(calculate("mensualite-pret", { capital: 200000, rate: 3.5, years: 20, insurance_rate: 0 }).headline, 1159.92, 0.1);
  assert.equal(calculate("budget-50-30-20", { income: 2800, needs: 1400, wants: 700, savings: 500 }).headline, 200);
  const comparison = calculate("comparaison-epargne", { initial: 5000, monthly_a: 200, rate_a: 3, monthly_b: 150, rate_b: 5, years: 15 });
  assert.ok(comparison.headline > 0);
  assert.equal(comparison.series.length, 2);
});
