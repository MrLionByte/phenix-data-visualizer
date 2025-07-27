import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import DataCard from '../components/DataCard';
import UrlFetcher from '../components/UrlFetcher';
import toast from 'react-hot-toast';
import {LoadingSpinner} from '../components/Loadings';
import {exportToPDF} from '../utils/PDFConverter';
import {exportToDoc} from '../utils/DOCConverter';


const Home = () => {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [displayCount, setDisplayCount] = useState(20);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      
      const dataArray = Array.isArray(json) ? json : [json];
      
      setData(dataArray);
      setOriginalData(dataArray);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `data-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

    const handleExportPDF = () => {
      toast('Will be available by 12:00 PM!', { icon: '⏳',});  
      // exportToPDF(data)
    };

    const handleExportExcel = () => {
      toast('Will be available by 12:00 PM!', { icon: '⏳',});  
      // exportToPDF(data)
    };

    const handleExportDocs = () => {
      toast('Will be available by 12:00 PM!', { icon: '⏳',});  
      // exportToPDF(data)
    };

  const handleShowCard = () => {
    console.log(data);
    
    if(data.length > 0){
        setShowCard(prev => !prev);
    } else{
        toast.error("You haven't fetched any data. Enter a url and click fetch.")
    }
  };

  const deleteItem = (indexToDelete) => {
    setData((prevData) => prevData.filter((_, index) => index !== indexToDelete));
  };

  const updateItem = (indexToUpdate, updatedItem) => {
    setData((prevData) => 
      prevData.map((item, index) => 
        index === indexToUpdate ? updatedItem : item
      )
    );
  };

  const resetData = () => {
    setData([...originalData]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto">
        <AnimatePresence mode="wait">
          {!showCard ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center space-y-12 min-h-screen justify-center"
            >
     
              <div className="space-y-6 max-w-4xl">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text leading-tight"
                >
                  Phenix Data Visualizer
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                >
                  Transform any API endpoint into beautiful, interactive cards. Fetch, explore, edit, and manage your data with modern design and powerful functionality.
                </motion.p>
              </div>

              <div className="w-full flex justify-center mt-4">
                <UrlFetcher
                  url={url}
                  setUrl={setUrl}
                  loading={loading}
                  handleSearch={handleSearch}
                  handleExportJSON={handleExportJSON}
                  handleExportPDF={handleExportPDF}
                  handleExportDocs={handleExportDocs}
                  handleExportExcel={handleExportExcel}
                  handleShowCard={handleShowCard}
                  dataLength={data.length}
                  fieldCount={data.length > 0 ? Object.keys(data[0] || {}).length : 0}
                  displayCount={displayCount}
                  setDisplayCount={setDisplayCount}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 p-5"
            >
     
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShowCard}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-medium"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Search
                  </motion.button>
                  
                  <div className="text-white/60 text-sm">
                    Showing {Math.min(displayCount, data.length)} of {data.length} items
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {data.length !== originalData.length && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetData}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/15 transition-all duration-300 text-sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset Changes
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExportJSON}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 font-medium"
                  >
                    Export JSON
                  </motion.button>
                </div>
              </div>

     
              {loading ? (
                <LoadingSpinner />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flexible-grid"
                >
                  <AnimatePresence mode="popLayout">
                    {data.slice(0, displayCount).map((item, index) => (
                      <DataCard
                        key={`${item.id || index}-${JSON.stringify(item).slice(0, 50)}`}
                        item={item}
                        onDelete={deleteItem}
                        onUpdate={updateItem}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {data.length > displayCount && (
                <div className="flex justify-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDisplayCount(prev => Math.min(prev + 20, data.length))}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-medium"
                  >
                    Load More Items ({data.length - displayCount} remaining)
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Home;