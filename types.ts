
export interface Room {
  id: string;
  name: string;
  building: string;
  wing: number;
  teacher?: string;
  department?: string;
  coords: [number, number]; // [lat, lng] for the center/label
  bounds?: [[number, number], [number, number]]; // [sw_lat, sw_lng], [ne_lat, ne_lng]
}

export interface BuildingInfo {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface MapData {
  rooms: Room[];
  buildings: Record<number, BuildingInfo>;
}
