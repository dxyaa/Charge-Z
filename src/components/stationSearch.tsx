"use client";
import React, { useState } from 'react';
import { collection, getDocs, getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '@/app/firebase';
import "tailwindcss/tailwind.css";

interface SearchResult {
  id: string;
  name: string;
}

interface station {
  Name: string;
  Status: boolean;
}

interface stationsearchProps {
  onSelect: (selectedName: string) => void; // Callback function prop
}

const Stationsearch: React.FC<stationsearchProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null); // State to hold the selected item

  const handleSearch = async (queryStr: string) => {
    console.log("Connected to Collections");
    setSearchTerm(queryStr);
    if (!queryStr.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const db = getFirestore(app);
      const stationCollectionRef = collection(db, 'stations');
      const querySnapshot = await getDocs(stationCollectionRef);

      const results: SearchResult[] = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        results.push({
          id,
          name: id, // Since the document ID is the station name
        });
      });

      // Filter results based on search term
      const filteredResults = results.filter(result =>
        result.name.toLowerCase().includes(queryStr.toLowerCase())
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelect = async (selectedItem: SearchResult) => {
    setSelectedItem(selectedItem); // Update selected item
    setSearchTerm(selectedItem.name); // Fill input field with selected value
    onSelect(selectedItem.name); // Call the callback function with the selected name

    try {
      const db = getFirestore(app);
      const stationDocRef = doc(db, 'stations', selectedItem.id);
      const stationDocSnapshot = await getDoc(stationDocRef);
      const stationData = stationDocSnapshot.data() as station | undefined;

      if (stationData) {
        console.log(`Station Name: ${stationData.Name}, Status: ${stationData.Status}`);
      }
    } catch (error) {
      console.error('Error fetching station capacity:', error);
    }
  };

  return (
    <div className=''>
      <input
        type="text"
        value={searchTerm}
        className='bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Station name"
      />
      <ul className='bg-white mt-5 border rounded-lg min-w-full'>
        {searchResults.slice(0, 2).map((result) => (
          <li key={result.id} className='max-h-10' onClick={() => handleSelect(result)}>
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stationsearch;
