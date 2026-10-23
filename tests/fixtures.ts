/** Helpers for building test data. */

import { Itinerary, Segment, Traveler, type Cabin } from "../policy/models.ts";

const HOUR_MS = 3_600_000;

export function makeTraveler({
  clientId = "acme",
  title = "Software Engineer",
  name = "Dana Reyes",
}: { clientId?: string; title?: string; name?: string } = {}): Traveler {
  return new Traveler({
    id: "trv_001",
    name,
    email: "dana.reyes@example.com",
    clientId,
    title,
  });
}

export function makeSegment({
  origin = "BOS",
  destination = "ORD",
  cabin = "economy",
  durationHours = 2.5,
}: {
  origin?: string;
  destination?: string;
  cabin?: Cabin;
  durationHours?: number;
} = {}): Segment {
  const departAt = new Date(2026, 9, 14, 9, 0);
  return new Segment({
    origin,
    destination,
    departAt,
    arriveAt: new Date(departAt.getTime() + durationHours * HOUR_MS),
    carrier: "AA",
    flightNumber: "AA1234",
    cabin,
  });
}

export function makeItinerary({
  priceUsd = 450.0,
  traveler,
  segment,
}: { priceUsd?: number; traveler?: Traveler; segment?: Segment } = {}): Itinerary {
  return new Itinerary({
    id: "itn_001",
    traveler: traveler ?? makeTraveler(),
    segment: segment ?? makeSegment(),
    priceUsd,
  });
}
