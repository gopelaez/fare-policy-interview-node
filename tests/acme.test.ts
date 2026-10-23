import assert from "node:assert/strict";
import test from "node:test";

import { registry } from "../policy/engine.ts";
import "../policy/clients.ts"; // registers the policies

import { makeItinerary, makeSegment } from "./fixtures.ts";

test("cheap economy trip is allowed", () => {
  const itinerary = makeItinerary({ priceUsd: 450.0 });
  assert.equal(registry.forClient("acme").evaluate(itinerary), true);
});

test("expensive trip is denied", () => {
  const itinerary = makeItinerary({ priceUsd: 1200.0 });
  assert.equal(registry.forClient("acme").evaluate(itinerary), false);
});

test("business class is denied", () => {
  const itinerary = makeItinerary({ segment: makeSegment({ cabin: "business" }) });
  assert.equal(registry.forClient("acme").evaluate(itinerary), false);
});
