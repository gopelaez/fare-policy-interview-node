/** Core domain models for the booking system. */

export const CABINS = ["economy", "premium_economy", "business", "first"] as const;

export type Cabin = (typeof CABINS)[number];

export interface TravelerFields {
  id: string;
  name: string;
  email: string;
  clientId: string;
  title: string;
}

export class Traveler implements TravelerFields {
  id: string;
  name: string;
  email: string;
  clientId: string;
  title: string;

  constructor({ id, name, email, clientId, title }: TravelerFields) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.clientId = clientId;
    this.title = title;
  }
}

export interface SegmentFields {
  origin: string;
  destination: string;
  departAt: Date;
  arriveAt: Date;
  carrier: string;
  flightNumber: string;
  cabin: Cabin;
}

export class Segment implements SegmentFields {
  origin: string;
  destination: string;
  departAt: Date;
  arriveAt: Date;
  carrier: string;
  flightNumber: string;
  cabin: Cabin;

  constructor({
    origin,
    destination,
    departAt,
    arriveAt,
    carrier,
    flightNumber,
    cabin,
  }: SegmentFields) {
    this.origin = origin;
    this.destination = destination;
    this.departAt = departAt;
    this.arriveAt = arriveAt;
    this.carrier = carrier;
    this.flightNumber = flightNumber;
    this.cabin = cabin;
  }

  get durationHours(): number {
    return (this.arriveAt.getTime() - this.departAt.getTime()) / 3_600_000;
  }
}

export interface ItineraryFields {
  id: string;
  traveler: Traveler;
  segment: Segment;
  priceUsd: number;
}

export class Itinerary implements ItineraryFields {
  id: string;
  traveler: Traveler;
  segment: Segment;
  priceUsd: number;

  constructor({ id, traveler, segment, priceUsd }: ItineraryFields) {
    this.id = id;
    this.traveler = traveler;
    this.segment = segment;
    this.priceUsd = priceUsd;
  }
}
