import React, { useMemo } from 'react';

const DataParseGrid = ({ flightData, filters }) => {

  const handleSelect = (index) => {
    window.alert("Row Selected")
  };

  //filter condition user input start----------------------------
  const filteredData = useMemo(() => {
    if (!filters) return flightData;

    return flightData.filter((flight) => {
        // Initialize match variables
        let originMatch = true;
        let destinationMatch = true;

        // Implement filtering logic based on the input values
        if (filters.origin) {
            originMatch = flight.itineraries[0].segments[0].departure.iataCode === filters.origin;
        }
        if (filters.destination) {
            destinationMatch = flight.itineraries[0].segments[1].arrival.iataCode === filters.destination;
        }

        // Additional filters
        const selectedAirlinesMatch = filters.selectedAirlines ? flight.itineraries[0].segments[0].carrierCode === filters.selectedAirlines : true;
        const selectTravelerMatch = filters.selectTraveler ? flight.itineraries.some((itinerary) => {
            return itinerary.segments.some((segment) => {
                return segment.seat && segment.seat.includes(filters.selectTraveler);
            });
        }) : true;

        let dateMatch = true;
        if (filters.date) {
            try {
                const departureDate = new Date(flight.itineraries[0].segments[0].departure.at);
                const filtersDate = new Date(filters.date);
                if (!isNaN(departureDate.getTime()) && !isNaN(filtersDate.getTime())) {
                    // Convert both dates to ISO 8601 format for easy comparison
                    const formattedDepartureDate = departureDate.toISOString().split('T')[0];
                    const formattedFiltersDate = filtersDate.toISOString().split('T')[0];

                    dateMatch = formattedDepartureDate === formattedFiltersDate;
                } else {
                    console.error("Invalid date value.");
                }
            } catch (error) {
                console.error("An error occurred:", error.message);
            }
        }

        // Combine match conditions
        return originMatch && destinationMatch && dateMatch && selectedAirlinesMatch || selectTravelerMatch;
    });
}, [flightData, filters]);
//filter condition user input End----------------------------

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full">
        {/* Table headers */}
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Flight</th>
            <th className="px-4 py-2">Aircraft</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Fare</th>
            <th className="px-4 py-2">Route</th>
            <th className="px-4 py-2">Departure</th>
            <th className="px-4 py-2">Arrival</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Price</th>
            {/* <th className="px-4 py-2">Seat</th> */}
            <th className="px-4 py-2">Select</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {filteredData.map((flight, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              {/* Display flight details */}
              {/* <td className="border px-4 py-2">{flight.itineraries[0].segments[0].flightNumber}</td> */}
              <td className="border px-4 py-2">{flight.itineraries[0].segments[0].carrierCode} {flight.itineraries[0].segments[0].flightNumber}
                {flight.itineraries[0].segments[0].aircraft}
              </td>
              <td className="border px-4 py-2">{flight.itineraries[0].segments[0].aircraft}</td>
              <td className="border px-4 py-2">{flight.class[0][0]}</td>
              <td className="border px-4 py-2">{flight.fareBasis}</td>
              <td className="border px-4 py-2">{`${flight.itineraries[0].segments[0].departure.iataCode} - ${flight.itineraries[0].segments[1].arrival.iataCode}`}</td>
              <td className="border px-4 py-2">{flight.itineraries[0].segments[0].departure.at}</td>
              <td className="border px-4 py-2">{flight.itineraries[0].segments[1].arrival.at}</td>
              <td className="border px-4 py-2">{flight.itineraries[0].duration}</td>
              <td className="border px-4 py-2">{flight.price}</td>
              {/* <td className="border px-4 py-2">{flight.seat[0]}</td> */}
              <td className="border px-4 py-2">
                <button onClick={() => handleSelect(index)} className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataParseGrid;
