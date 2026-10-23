/** Travel policy evaluation. */

import type { Itinerary } from "./models.ts";

/**
 * Base class for a client's travel policy.
 *
 * Subclasses implement `evaluate` to decide whether an itinerary
 * may be booked under this client's rules.
 */
export abstract class Policy {
  name: string = "unnamed";

  abstract evaluate(itinerary: Itinerary): boolean;
}

export class PolicyRegistry {
  readonly #policies = new Map<string, Policy>();

  register(clientId: string, policy: Policy): void {
    this.#policies.set(clientId, policy);
  }

  forClient(clientId: string): Policy {
    const policy = this.#policies.get(clientId);
    if (!policy) {
      throw new Error(`No policy registered for client '${clientId}'`);
    }
    return policy;
  }
}

export const registry = new PolicyRegistry();
