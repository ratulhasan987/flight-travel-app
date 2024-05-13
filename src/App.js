
import React, { useState, useRef, useCallback } from 'react';
import { TextBox, DateBox, List } from 'devextreme-react';
import { DropDownBox } from 'devextreme-react/drop-down-box';
import flightData from './data/flightData.json';
import 'devextreme/dist/css/dx.light.css';
import DataParseGrid from './DataParseGrid';
import './App.css';

const airlines = ["TK", "EK", "KU", "3L", "EY", "FZ", "QR"];
const traveler = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function App() {

  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    date: '',
    selectedAirlines: '',
    selectTraveler: '',

  });

  // handleTextBoxChange start............ 
  const handleTextBoxChange = (fieldName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [fieldName]: value,
    }));
  };
  // handleTextBoxChange End............ 

  //handle Combobox Start-------------
  const handleComboBoxChange = (fieldName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [fieldName]: value,
    }));
  };
  //handle Combobox end---------------

  // combobox selectAirline Start----------
  const [dataSource] = useState(airlines);
  const listRef = useRef(null);
  const onItemDeleting = useCallback((e) => {
    if (dataSource.length === 1) {
      e.cancel = true;
    }
  }, [dataSource]);

  const [selectedAirlines, setSelectedAirlines] = useState('');
  const dropDownBoxRef = useRef(null);
  const changeDropDownBoxValue = useCallback((arg) => {
    setSelectedAirlines(arg.addedItems[0]);
    dropDownBoxRef.current.instance.close();
  }, []);
  // combobox selectAirline End-------------

  // combobox selectTraveler Start----------
  const [dataSource1] = useState(traveler);
  const listRef1 = useRef(null);
  const onItemDeleting1 = useCallback((e) => {
    if (dataSource.length === 1) {
      e.cancel = true;
    }
  }, [dataSource]);

  const [selectTraveler, setSelectTraveler] = useState('');
  const dropDownBoxRef1 = useRef(null);
  const changeDropDownBoxValue1 = useCallback((arg) => {
    setSelectTraveler(arg.addedItems[0]);
    dropDownBoxRef.current.instance.close();
  }, []);
  // combobox selectTraveler End----------



  // Handle grid view start-------
  const [showGrid, setShowGrid] = useState(false);
  const handleSearchButtonClick = () => {
    setShowGrid(true); // Set showGrid to true when search button is clicked
  }
  // Handle grid view End---------


  return (
    <div className='py-2 px-14'>

      {/* Tab Button Start------ */}
      <div className="flex justify-center">
        <div className="flex w-full justify-center py-1">
          <button className="bg-gray-200 hover:bg-gray-300 py-0 px-4 border border-blue-900 ">Round Trip</button>
          <button className="bg-blue-900 hover:bg-blue-600 py-0 px-4 border border-blue-900 text-white">One Way</button>
          <button className="bg-gray-200 hover:bg-gray-300 py-0 px-4 border border-blue-900">Multi City</button>
        </div>
      </div>
      {/* Tab Button End------ */}

      {/* for desh start----- */}
      <div className="p-2">
        <div className="flex items-center">
          <div className="flex-grow border-b border-blue-500"></div>
        </div>
      </div>
      {/* for desh start----- */}

      {/* input fields Start------- */}
      <div className='flex flex-wrap justify-center md:justify-start'>

        {/* textbox fields start---------  */}
        <div className='p-2 w-40'>
          <TextBox
            placeholder='Origin'
            maxLength={20}
            showClearButton={true}
            value={filters.origin}
            onValueChanged={(e) => handleTextBoxChange('origin', e.value)}
          />
        </div>
        <div className='p-2 w-40'>
          <TextBox
            placeholder='Destination'
            maxLength={20}
            showClearButton={true}
            value={filters.destination}
            onValueChanged={(e) => handleTextBoxChange('destination', e.value)}
          />
        </div>
        {/* textbox fields End---------  */}

        {/* datebox field start--------- */}
        <div className='p-2 w-44'>
          <DateBox
            placeholder='Date'
            // showClearButton={true}
            value={filters.date instanceof Date ? filters.date : null}
            onValueChanged={(e) => handleTextBoxChange('date', e.value)}
            displayFormat="yyyy-MM-dd"
          />
        </div>
        {/* datebox field end------------ */}

        {/* dropDown box start----------- */}
        {/* Day- start--- */}
        <div className='p-2 w-28  '>
          <DropDownBox
            dataSource={dataSource}
            // value={selectedAirlines}
            ref={dropDownBoxRef}
            // onValueChanged={onValueChanged}
            acceptCustomValue={true}
            openOnFieldClick={false}
            // onEnterKey={addItem}

            placeholder='Day-'
            showClearButton={true}
          // value={filters.selectedAirlines}
          // onValueChanged={(e) => onValueChanged('selectedAirlines', e.value)}
          >
            <List
              ref={listRef}
              // dataSource={dataSource}
              // allowItemDeleting={true}
              onItemDeleting={onItemDeleting}
              selectionMode="single"
              onSelectionChanged={changeDropDownBoxValue}
            />
          </DropDownBox>
        </div>
        {/* Day- end--- */}

        {/* Day+ start--- */}
        <div className='p-2 w-28  '>
          <DropDownBox
            dataSource={dataSource}
            // value={selectedAirlines}
            ref={dropDownBoxRef}
            // onValueChanged={onValueChanged}
            acceptCustomValue={true}
            openOnFieldClick={false}
            // onEnterKey={addItem}

            placeholder='Day+'
          // showClearButton={true}
          // value={filters.selectedAirlines}
          // onValueChanged={(e) => onValueChanged('selectedAirlines', e.value)}
          >
            <List
              ref={listRef}
              // dataSource={dataSource}
              // allowItemDeleting={true}
              onItemDeleting={onItemDeleting}
              selectionMode="single"
              onSelectionChanged={changeDropDownBoxValue}
            />
          </DropDownBox>
        </div>
        {/* Day+ end--- */}

        {/* select airlines start----- */}
        <div className='p-2 w-40'>
          <DropDownBox
            dataSource={dataSource}
            value={selectedAirlines}
            ref={dropDownBoxRef}
            // onValueChanged={onValueChanged}
            acceptCustomValue={true}
            openOnFieldClick={false}
            // onEnterKey={addItem}

            placeholder='Select Airline'
            // showClearButton={true}
            // value={filters.selectedAirlines}
            onValueChanged={(e) => handleComboBoxChange('selectedAirlines', e.value)}
          >
            <List
              ref={listRef}
              dataSource={dataSource}
              // allowItemDeleting={true}
              onItemDeleting={onItemDeleting}
              selectionMode="single"
              onSelectionChanged={changeDropDownBoxValue}
            />
          </DropDownBox>
        </div>
        {/* select airlines end----- */}

        <div className=' px-1 py-3'>+</div>

        {/* ADT start--- */}
        <div className='p-2 w-36 '>
          <DropDownBox
            dataSource={dataSource}
            // value={selectedAirlines}
            ref={dropDownBoxRef}
            // onValueChanged={onValueChanged}
            acceptCustomValue={true}
            openOnFieldClick={false}
            // onEnterKey={addItem}

            placeholder='ADT'
          // showClearButton={true}
          // value={filters.selectedAirlines}
          // onValueChanged={(e) => onValueChanged('selectedAirlines', e.value)}
          >
            <List
              ref={listRef}
              // dataSource={dataSource}
              // allowItemDeleting={true}
              onItemDeleting={onItemDeleting}
              selectionMode="single"
              onSelectionChanged={changeDropDownBoxValue}
            />
          </DropDownBox>
        </div>
        {/* ADT end--- */}


        {/* Traveler start----- */}
        <div className='p-2 w-36 '>
          <DropDownBox
            dataSource={dataSource1}
            value={selectTraveler}
            ref={dropDownBoxRef1}
            // onValueChanged={onValueChanged}
            acceptCustomValue={true}
            openOnFieldClick={false}
            // onEnterKey={addItem}

            placeholder='Traveler'
            // showClearButton={true}
            // value={filters.selectedAirlines}
            onValueChanged={(e) => handleComboBoxChange('selectTraveler', e.value)}
          >
            <List
              ref={listRef1}
              dataSource={dataSource1}
              // allowItemDeleting={true}
              onItemDeleting={onItemDeleting1}
              selectionMode="single"
              onSelectionChanged={changeDropDownBoxValue1}
            />
          </DropDownBox>
        </div>
        {/* Traveler end----- */}
        {/* dropDown box End----------------- */}
        <div className=' px-1 py-3'>+</div>
      </div>
      {/* input fields end------- */}

      {/* for desh start----- */}
      <div className="p-2">
        <div className="flex items-center">
          <div className="flex-grow border-b border-blue-500"></div>
        </div>
      </div>
      {/* for desh End----- */}

      {/* Extra_Option, Environment and SearchButton part Start-------- */}
      <div className='flex'>
        <div className="flex items-center">
          <input type="checkbox" id="extraOption" className="form-checkbox h-5 w-5 text-blue-600" />
          <label htmlFor="extraOption" className="ml-2 text-gray-700">Extra_Option </label>
        </div>

        <div className='flex justify-end w-full  py-1'>
          <div className="flex items-center mr-2">
            <p className="text-gray-700">Environment</p>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="checkbox1" className="hidden" />
            <label htmlFor="checkbox1" className="flex items-center cursor-pointer">
              <div className="rounded-full border border-gray-400 w-4 h-4 flex items-center justify-center mr-2">
                <div className="rounded-full bg-blue-500 w-2 h-2"></div>
              </div>
              Dummy
            </label>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="checkbox2" className="hidden" />
            <label htmlFor="checkbox2" className="flex items-center cursor-pointer">
              <div className="rounded-full border border-gray-400 w-4 h-4 flex items-center justify-center ml-2 mr-2">
              </div>
              PDT
            </label>
          </div>
        </div>


        {/* Button to trigger search start--- */}
        <div className='flex justify-end w-full py-1'>
          <button onClick={handleSearchButtonClick} className='bg-blue-900 hover:bg-blue-600 py-2 px-4 border border-blue-900 font-bold text-white rounded'>
            Search
          </button>
        </div>
        {/* Button to trigger search End--- */}
      </div>
      {/* Extra_Option, Environment and SearchButton part End-------- */}

      {/* for desh start----- */}
      <div className="p-2">
        <div className="flex items-center">
          <div className="flex-grow border-b border-blue-500"></div>
        </div>
      </div>
      {/* for desh End----- */}


      {/* showGrid with Parse data conditionally start---- */}
      {showGrid && (
        <div className='grid-container'>
          <h3 className='mb-4'>Data Parsed Successfully</h3>
          <DataParseGrid flightData={flightData.flightOffer} filters={filters} />
        </div>
      )}
      {/* showGrid with Parse data conditionally end---- */}

    </div>
  );
}

export default App;
