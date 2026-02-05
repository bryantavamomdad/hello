
import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, School, Info, User, BookOpen, Layers } from 'lucide-react';
import { SCHOOL_DATA } from './data';
import { Room } from './types';

// Map Recenter Component
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([34.4370, -119.8662]);
  const [mapZoom, setMapZoom] = useState(18);

  const filteredRooms = useMemo(() => {
    return SCHOOL_DATA.rooms.filter(room => 
      room.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.teacher?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setMapCenter(room.coords);
    setMapZoom(20);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-100 overflow-hidden text-slate-900 font-['Inter']">
      
      {/* Sidebar Section */}
      <div className="w-full md:w-96 flex flex-col h-1/3 md:h-full bg-white shadow-2xl z-20 overflow-hidden border-r border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <School className="w-24 h-24 rotate-12" />
          </div>
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="p-2 bg-red-600 rounded-lg shadow-lg">
              <School className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight uppercase italic">DPHS Navigator</h1>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] relative z-10">Interactive Campus Map</p>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 shrink-0 bg-white">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="Search Room, Dept, or Restroom..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-4 focus:ring-red-500/5 focus:bg-white transition-all border border-slate-100 focus:border-red-500 font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Rooms List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/50 scrollbar-hide">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => handleRoomSelect(room)}
                className={`w-full text-left p-4 rounded-xl transition-all border flex items-center justify-between group ${
                  selectedRoom?.id === room.id 
                    ? 'bg-red-50 border-red-200 shadow-lg -translate-y-0.5' 
                    : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`font-black text-lg leading-none mb-1 ${selectedRoom?.id === room.id ? 'text-red-600' : 'text-slate-900'}`}>{room.id}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-tight truncate max-w-[180px] ${selectedRoom?.id === room.id ? 'text-red-800/60' : 'text-slate-400'}`}>
                    {room.name}
                  </span>
                </div>
                <div 
                  className={`w-3 h-3 rounded-full shadow-inner ring-2 ring-white/50 ${room.id.startsWith('RR') ? 'animate-pulse' : ''}`} 
                  style={{ backgroundColor: SCHOOL_DATA.buildings[room.wing].color }}
                />
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-300">
              <Info className="w-12 h-12 mb-3 animate-pulse" />
              <p className="text-xs font-black uppercase tracking-widest">No matching results</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="p-5 bg-white border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-2 mb-4 text-slate-400 uppercase tracking-[0.2em] text-[10px] font-black">
            <Layers className="w-3 h-3" />
            <span>Campus Legend</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {Object.values(SCHOOL_DATA.buildings).map(b => (
              <div key={b.id} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: b.color }} />
                <span className="text-[10px] font-black text-slate-600 truncate uppercase tracking-tight">{b.name.split(':')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative h-2/3 md:h-full">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          minZoom={15}
          maxZoom={22}
          scrollWheelZoom={true} 
          className="z-10 h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            className="clean-technical-tiles"
          />
          <ChangeView center={mapCenter} zoom={mapZoom} />
          
          {SCHOOL_DATA.rooms.map((room) => {
            const buildingColor = SCHOOL_DATA.buildings[room.wing].color;
            const isSelected = selectedRoom?.id === room.id;
            const isRestroom = room.id.startsWith('RR');
            
            const positions: [number, number][] = room.bounds ? [
              [room.bounds[0][0], room.bounds[0][1]], 
              [room.bounds[1][0], room.bounds[0][1]], 
              [room.bounds[1][0], room.bounds[1][1]], 
              [room.bounds[0][0], room.bounds[1][1]], 
            ] : [room.coords];

            return (
              <Polygon
                key={room.id}
                positions={positions}
                pathOptions={{
                  fillColor: isRestroom ? '#94a3b8' : buildingColor,
                  fillOpacity: isSelected ? 0.95 : 0.6,
                  color: isSelected ? '#ef4444' : '#64748b',
                  weight: isSelected ? 4 : 1,
                  dashArray: isSelected ? '' : (isRestroom ? '4,4' : '2,2')
                }}
                eventHandlers={{
                  click: () => setSelectedRoom(room),
                }}
              >
                <Tooltip 
                  permanent 
                  direction="center" 
                  className={`custom-label font-black text-[9px] md:text-[10px] tracking-tighter pointer-events-none uppercase ${isRestroom ? 'text-slate-500' : 'text-slate-800'}`}
                >
                  {isRestroom ? '🚻' : room.id}
                </Tooltip>
                
                <Popup className="custom-popup" offset={[0, -5]}>
                  <div className="flex flex-col w-64 overflow-hidden rounded-xl">
                    <div className="h-1.5 w-full shadow-sm" style={{ backgroundColor: isRestroom ? '#64748b' : buildingColor }} />
                    <div className="p-5 bg-white">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                           <span className={`px-2 py-0.5 text-white text-[10px] font-black rounded uppercase tracking-tighter ${isRestroom ? 'bg-slate-400' : 'bg-slate-900'}`}>{room.id}</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{room.building}</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight">{room.name}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <User className="w-4 h-4 text-red-600" />
                          <div>
                            <p className="text-[9px] uppercase font-black text-slate-400 leading-none mb-1 tracking-widest">Instructor / Staff</p>
                            <p className="text-sm font-bold text-slate-900">{room.teacher || 'Varies'}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="text-[9px] uppercase font-black text-slate-400 leading-none mb-1 tracking-widest">Department</p>
                            <p className="text-sm font-bold text-slate-900">{room.department || 'Academic'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Polygon>
            );
          })}
        </MapContainer>

        {/* Map UI Overlays */}
        <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
           <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-2xl border border-white flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-lg shadow-lg shadow-red-500/10">
                 <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1 tracking-widest">Campus View</p>
                 <p className="text-xs font-black text-slate-900 italic tracking-tighter uppercase">Area 2 Detail Optimized</p>
              </div>
           </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-full px-6 flex justify-center">
          <button 
            onClick={() => {
              setMapCenter([34.4370, -119.8662]);
              setMapZoom(18);
              setSelectedRoom(null);
            }}
            className="group px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-red-600 hover:-translate-y-1 transition-all flex items-center gap-4 active:scale-95 border border-white/20"
          >
            <School className="w-4 h-4 text-red-100" />
            Reset Campus View
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
