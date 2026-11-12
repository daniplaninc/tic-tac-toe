Iteration 1: Basic Denomination Breakdown (Stateless)
Focus: Proving the greedy breakdown algorithm and basic formatting/output contracts.

Zero or Invalid Withdrawal Amounts (Guard Rails)

Withdrawing 0€ returns an empty dispensing result (no bills or coins).

Withdrawing a negative amount (e.g., -50€) is rejected with a validation error.

Exact Single-Unit Match (Triangulation Start)

Withdrawing 1€ dispenses 1 coin of 1.

Withdrawing 500€ dispenses 1 bill of 500.

Multiple Units of the Same Denomination

Withdrawing 2€ dispenses 1 coin of 2 (proving largest-first selection over 2 coins of 1).

Withdrawing 400€ dispenses 2 bills of 200.

Mixed Denominations (Bills + Coins)

Withdrawing 15€ dispenses 1 bill of 10 and 1 bill of 5.

Withdrawing 434€ (kata acceptance example) dispenses 2 bills of 200, 1 bill of 20, 1 bill of 10, and 2 coins of 2.

Full Spectrum Coverage

Withdrawing 888€ (500 + 200 + 100 + 50 + 20 + 10 + 5 + 2 + 1) dispenses exactly 1 of every bill and coin denomination—verifying no denomination is missing or misordered.

Iteration 2: Finite Inventory & Error Handling (Stateful)
Focus: State mutation, fallback logic when stock runs out, and transactional rollback on failure.

Basic Stock Depletion

Withdrawing 500€ dispenses 1 bill of 500 and reduces the ATM's 500€ bill count from 2 to 1.

Subsequent withdrawals reflect the updated inventory rather than resetting to initial stock.

Denomination Exhaustion & Fallback

When all 500€ bills are depleted (e.g., after withdrawing 1000€), withdrawing another 500€ falls back to 2 bills of 200 and 1 bill of 100.

Chained acceptance scenario from the kata:

Initial state (3,900€ total): Withdrawing 1,725€ dispenses 2×500, 3×200, 1×100, 1×20, 1×5 (leaving 2,175€).

Next withdrawal of 1,825€ uses the depleted state and dispenses 4×100, 12×50, 19×20, 44×10, 1×5 (leaving 350€ in small bills/coins).

Total Funds Exceeded

Requesting more than the ATM's current total balance (e.g., requesting 4,000€ on a fresh 3,900€ ATM) triggers the exact error message: "The ATM machine has not enough money, please go to the nearest atm machine".

State invariant check: After a failed withdrawal, the ATM's inventory remains completely unchanged.

Insufficient Exact Change (Critical Edge Case)

Suppose the ATM only has 1 bill of 10 (10€ total) and the user requests 7€. Even though 10€ > 7€, the ATM cannot make exact change.

It must return the "not enough money" error and ensure the 10€ bill is not mistakenly dispensed or deducted from inventory (atomic transaction / rollback).

Complete Drainage to Zero

Withdrawing the exact remaining balance (3,900€) succeeds, leaves 0 units of every denomination, and causes any subsequent withdrawal of 1€ to fail with the "not enough money" error.