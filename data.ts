
import { MapData, Room } from './types';

/**
 * Dos Pueblos High School - Authentic Layout Simulation
 * Coordinates are centered around 34.4368, -119.8661
 * Highly detailed mapping for Wing 2 based on provided floorplan image.
 */

const LAT_UNIT = 0.00007; // Vertical scaling (approx 7.7m)
const LNG_UNIT = 0.00011; // Horizontal scaling (approx 10m)

// Helper to create specific rectangular bounds
const makeRoom = (row: number, col: number, latBase: number, lngBase: number, w: number = 1, h: number = 1): [[number, number], [number, number]] => {
  const sw_lat = latBase + (row * LAT_UNIT);
  const sw_lng = lngBase + (col * LNG_UNIT);
  return [
    [sw_lat, sw_lng],
    [sw_lat + (h * LAT_UNIT), sw_lng + (w * LNG_UNIT)]
  ];
};

// Bases for different wings
const WING1_BASE: [number, number] = [34.4361, -119.8672]; 
const WING2_BASE: [number, number] = [34.4370, -119.8672]; // North West area
const WING3_BASE: [number, number] = [34.4370, -119.8658]; 
const WING4_BASE: [number, number] = [34.4361, -119.8658]; 

export const SCHOOL_DATA: MapData = {
  buildings: {
    1: { id: 'wing1', name: 'Wing 1: Arts & Admin', color: '#fbbf24', description: 'Theater (EPAC), Administration, and S/M Rooms.' },
    2: { id: 'wing2', name: 'Wing 2: Athletics & Tech', color: '#fca5a5', description: 'Gym, Pool, and B/T Wing rooms.' },
    3: { id: 'wing3', name: 'Wing 3: Engineering & Food', color: '#f97316', description: 'Cafeteria, Engineering Academy, and E Wing rooms.' },
    4: { id: 'wing4', name: 'Wing 4: Humanities & Library', color: '#3b82f6', description: 'Library, H Wing Science and Humanities rooms.' },
  },
  rooms: [
    // --- WING 2: GYM & POOL BLOCK ---
    { id: 'GYM', name: 'Main Gym (Gimnasio)', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Athletics', coords: [34.43715, -119.8669] as [number, number], bounds: makeRoom(0, 1, WING2_BASE[0], WING2_BASE[1], 2, 2.5) },
    { id: 'G-LOBBY', name: 'Gym Lobby', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Athletics', coords: [34.43695, -119.8669] as [number, number], bounds: makeRoom(-1, 1, WING2_BASE[0], WING2_BASE[1], 2, 1) },
    { id: 'G-LOCKER', name: 'Girls Lockers', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'PE', coords: [34.43715, -119.8671] as [number, number], bounds: makeRoom(0, 0, WING2_BASE[0], WING2_BASE[1], 1, 2.5) },
    { id: 'B-LOCKER', name: 'Boys Lockers', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'PE', coords: [34.43715, -119.8667] as [number, number], bounds: makeRoom(0, 3, WING2_BASE[0], WING2_BASE[1], 1, 2.5) },
    { id: 'WRESTLING', name: 'Wrestling Room', building: 'Wing 2', wing: 2, teacher: 'Coach', department: 'PE', coords: [34.43695, -119.8671] as [number, number], bounds: makeRoom(-1, 0, WING2_BASE[0], WING2_BASE[1], 1, 1) },
    { id: 'WEIGHTS', name: 'Weight Room', building: 'Wing 2', wing: 2, teacher: 'Coach', department: 'Athletics', coords: [34.43695, -119.8667] as [number, number], bounds: makeRoom(-1, 3, WING2_BASE[0], WING2_BASE[1], 1, 1) },
    { id: 'TRAINING', name: 'Training Room', building: 'Wing 2', wing: 2, teacher: 'Trainer', department: 'Athletics', coords: [34.43735, -119.8668] as [number, number], bounds: makeRoom(3, 3, WING2_BASE[0], WING2_BASE[1], 1, 0.5) },
    { id: 'VARSITY', name: 'Varsity Room', building: 'Wing 2', wing: 2, teacher: 'Coach', department: 'Athletics', coords: [34.43725, -119.8668] as [number, number], bounds: makeRoom(2.5, 3, WING2_BASE[0], WING2_BASE[1], 1, 0.5) },

    // Pool Block
    { id: 'POOL', name: 'Pool (Alberca)', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Athletics', coords: [34.4376, -119.8670] as [number, number], bounds: makeRoom(4.5, 0.2, WING2_BASE[0], WING2_BASE[1], 3.8, 2.5) },
    { id: 'POOLOFF', name: 'Pool Office', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Athletics', coords: [34.43745, -119.8671] as [number, number], bounds: makeRoom(4, 0.2, WING2_BASE[0], WING2_BASE[1], 1, 0.5) },
    { id: 'Q13', name: 'Room Q13', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Misc', coords: [34.43785, -119.8671] as [number, number], bounds: makeRoom(7.1, 0.2, WING2_BASE[0], WING2_BASE[1], 0.6, 1) },
    { id: 'Q12', name: 'Room Q12', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Misc', coords: [34.43785, -119.8670] as [number, number], bounds: makeRoom(7.1, 1.0, WING2_BASE[0], WING2_BASE[1], 0.6, 1) },
    { id: 'Q10', name: 'Room Q10', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Misc', coords: [34.43785, -119.8669] as [number, number], bounds: makeRoom(7.1, 1.8, WING2_BASE[0], WING2_BASE[1], 0.6, 1) },

    // --- RESTROOMS IN AREA 2 ---
    { id: 'RR-L', name: 'Restroom (Lobby Left)', building: 'Wing 2', wing: 2, teacher: 'Facilities', department: 'Support', coords: [34.4369, -119.8670] as [number, number], bounds: makeRoom(-1, 1, WING2_BASE[0], WING2_BASE[1], 0.5, 0.4) },
    { id: 'RR-R', name: 'Restroom (Lobby Right)', building: 'Wing 2', wing: 2, teacher: 'Facilities', department: 'Support', coords: [34.4369, -119.8668] as [number, number], bounds: makeRoom(-1, 2.5, WING2_BASE[0], WING2_BASE[1], 0.5, 0.4) },
    { id: 'RR-N', name: 'Restroom (Gym North)', building: 'Wing 2', wing: 2, teacher: 'Facilities', department: 'Support', coords: [34.4373, -119.8668] as [number, number], bounds: makeRoom(2.5, 2.5, WING2_BASE[0], WING2_BASE[1], 0.5, 0.5) },
    { id: 'RR-B', name: 'Restroom (B-Wing East)', building: 'Wing 2', wing: 2, teacher: 'Facilities', department: 'Support', coords: [34.4369, -119.8656] as [number, number], bounds: makeRoom(-1.6, 10.5, WING2_BASE[0], WING2_BASE[1], 0.8, 1.2) },

    // --- WING 2: T & B AREA (TECH & SOCIAL STUDIES) ---
    // B AREA (The Southern Block - 2 Rows)
    // Row 2 (B9-B14)
    ...['B9', 'B10', 'B11', 'B12', 'B13', 'B14'].map((id, i) => ({
      id, name: `Room ${id}`, building: 'Wing 2', wing: 2, teacher: 'History Dept', department: 'Social Studies',
      coords: [34.43695, -119.8666 + (i * 0.0001)] as [number, number], bounds: makeRoom(-1, 4.5 + i, WING2_BASE[0], WING2_BASE[1], 1, 0.6)
    })),
    // Row 1 (B8-B1)
    ...['B8', 'B7', 'B6', 'B5', 'B4', 'B3', 'B2', 'B1'].map((id, i) => ({
      id, name: `Room ${id}`, building: 'Wing 2', wing: 2, teacher: 'History Dept', department: 'Social Studies',
      coords: [34.43685, -119.8666 + (i * 0.0001)] as [number, number], bounds: makeRoom(-1.6, 4.5 + i, WING2_BASE[0], WING2_BASE[1], 1, 0.6)
    })),

    // T AREA
    // Cluster 1 (Left): T12, T11, T10, T9B, T9C, T8
    { id: 'T12', name: 'Room T12', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43715, -119.8666] as [number, number], bounds: makeRoom(1.5, 4.5, WING2_BASE[0], WING2_BASE[1], 0.6, 0.8) },
    { id: 'T11', name: 'Room T11', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43715, -119.8665] as [number, number], bounds: makeRoom(1.5, 5.1, WING2_BASE[0], WING2_BASE[1], 0.6, 0.8) },
    { id: 'T10', name: 'Room T10', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43705, -119.8666] as [number, number], bounds: makeRoom(0.5, 4.5, WING2_BASE[0], WING2_BASE[1], 0.6, 1) },
    { id: 'T9B', name: 'Room T9B', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43705, -119.8665] as [number, number], bounds: makeRoom(0.9, 5.1, WING2_BASE[0], WING2_BASE[1], 0.6, 0.4) },
    { id: 'T9C', name: 'Room T9C', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.4370, -119.8665] as [number, number], bounds: makeRoom(0.5, 5.1, WING2_BASE[0], WING2_BASE[1], 0.6, 0.4) },
    { id: 'T8', name: 'Room T8', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.4369, -119.8665] as [number, number], bounds: makeRoom(0, 4.5, WING2_BASE[0], WING2_BASE[1], 1.2, 0.5) },

    // Cluster 2 (Center): T7A, T6, T5A, T4, T7, T5
    { id: 'T7A', name: 'Room T7A', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43715, -119.8663] as [number, number], bounds: makeRoom(1.8, 6.5, WING2_BASE[0], WING2_BASE[1], 1, 0.5) },
    { id: 'T7', name: 'Room T7', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43705, -119.8663] as [number, number], bounds: makeRoom(1.3, 6.5, WING2_BASE[0], WING2_BASE[1], 1, 0.5) },
    { id: 'T6', name: 'Custodians', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Support', coords: [34.4371, -119.8661] as [number, number], bounds: makeRoom(1.3, 7.5, WING2_BASE[0], WING2_BASE[1], 1.2, 1) },
    { id: 'T5A', name: 'Room T5A', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43715, -119.8659] as [number, number], bounds: makeRoom(1.8, 8.7, WING2_BASE[0], WING2_BASE[1], 1, 0.5) },
    { id: 'T5', name: 'Room T5', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43705, -119.8659] as [number, number], bounds: makeRoom(1.3, 8.7, WING2_BASE[0], WING2_BASE[1], 1, 0.5) },
    { id: 'T4', name: 'Wood Shop', building: 'Wing 2', wing: 2, teacher: 'Ivan', department: 'Vocational', coords: [34.4371, -119.8657] as [number, number], bounds: makeRoom(1.3, 9.7, WING2_BASE[0], WING2_BASE[1], 1.2, 1) },

    // Cluster 3 (Far Right - Shifted East): T3, T2, T1
    { id: 'T3', name: 'Room T3', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43685, -119.8653] as [number, number], bounds: makeRoom(0.3, 12, WING2_BASE[0], WING2_BASE[1], 1.5, 0.8) },
    { id: 'T2A', name: 'Room T2A', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43675, -119.8654] as [number, number], bounds: makeRoom(-0.2, 12, WING2_BASE[0], WING2_BASE[1], 0.7, 0.5) },
    { id: 'T2', name: 'Room T2', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43675, -119.8653] as [number, number], bounds: makeRoom(-0.2, 12.7, WING2_BASE[0], WING2_BASE[1], 0.8, 0.5) },
    { id: 'T1A', name: 'Room T1A', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43665, -119.8654] as [number, number], bounds: makeRoom(-0.7, 12, WING2_BASE[0], WING2_BASE[1], 0.7, 0.5) },
    { id: 'T1', name: 'Room T1', building: 'Wing 2', wing: 2, teacher: 'Staff', department: 'Tech', coords: [34.43665, -119.8653] as [number, number], bounds: makeRoom(-0.7, 12.7, WING2_BASE[0], WING2_BASE[1], 0.8, 0.5) },

    // --- OTHER WINGS (SIMPLIFIED) ---
    { id: 'OFFICE', name: 'Front Office', building: 'Wing 1', wing: 1, teacher: 'Admin', department: 'Administration', coords: [34.43635, -119.8671] as [number, number], bounds: makeRoom(1.5, 0, WING1_BASE[0], WING1_BASE[1], 1.5, 1.2) },
    { id: 'CAFE', name: 'Cafeteria', building: 'Wing 3', wing: 3, teacher: 'Staff', department: 'Support', coords: [34.4373, -119.8655] as [number, number], bounds: makeRoom(2, 0, WING3_BASE[0], WING3_BASE[1], 3, 2) },
    { id: 'LIB', name: 'Library', building: 'Wing 4', wing: 4, teacher: 'Staff', department: 'Media', coords: [34.4363, -119.8655] as [number, number], bounds: makeRoom(1.5, 1, WING4_BASE[0], WING4_BASE[1], 2.5, 2.5) },
  ]
};
