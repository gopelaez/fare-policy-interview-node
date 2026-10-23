/** Per-client policy implementations. */

import { Policy, registry } from "./engine.ts";
import type { Itinerary } from "./models.ts";

/** Acme Corp: economy cabin only, and no more than $800 per trip. */
export class AcmePolicy extends Policy {
  override name = "Acme Corp";

  static readonly MAX_PRICE = 800.0;

  override evaluate(itinerary: Itinerary): boolean {
    if (itinerary.segment.cabin !== "economy") {
      return false;
    }
    if (itinerary.priceUsd > AcmePolicy.MAX_PRICE) {
      return false;
    }
    return true;
  }
}

registry.register("acme", new AcmePolicy());
