import { Link2, Search, FileSpreadsheet, FileBadge2Icon, Download, Globe } from "lucide-react";
import { motion } from "framer-motion";
import {LoadingDots} from './Loadings';

const UrlFetcher = ({ 
  url, 
  setUrl, 
  loading, 
  handleSearch, 
  handleExportJSON, 
  handleExportPDF,
  handleExportExcel,
  dataLength, 
  fieldCount, 
  displayCount, 
  setDisplayCount, 
  handleShowCard 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl space-y-10 url-components"
    >

      <div className="flex flex-col sm:flex-row w-full items-stretch gap-6">
        <div className="relative flex-1">
          <Link2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white text-center placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 hover:bg-white/15"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          disabled={loading}
          className="flex cursor-pointer items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
        >
          {loading ? (
            <>
              <LoadingDots />
              <span>Fetching</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Fetch Data</span>
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUrl('https://jsonplaceholder.typicode.com/posts')}
          disabled={loading}
          className="flex cursor-pointer items-center justify-center space-x-2 px-2 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed min-w-[60px]"
        >
          <Globe className="w-5 h-5" />
          <span>Demo URL</span>
        </motion.button>

      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-7">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShowCard} 
          className="interactive-element flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 text-sm font-bold"
        >
          <span>View In Cards</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportJSON} 
          className="interactive-element flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 text-sm font-bold"
        >
          <Download className="w-4 h-4" />
          <span>JSON</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportPDF} 
          className="interactive-element flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/25 text-sm font-bold"
        >
          <FileBadge2Icon className="w-4 h-4" />
          <span>PDF</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportExcel} 
          className="interactive-element flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 text-sm font-bold"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Excel</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-2xl font-bold text-white mb-1">{dataLength}</div>
          <div className="text-white/60 text-sm">Total Items</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-2xl font-bold text-white mb-1">{fieldCount}</div>
          <div className="text-white/60 text-sm">Fields per Item</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-white/60 text-sm mb-2">Items per Page</div>
          <select
            value={displayCount}
            onChange={(e) => setDisplayCount(parseInt(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 hover:bg-white/15 transition-all duration-300"
          >
            {[10, 20, 30, 50, 100].map((num) => (
              <option key={num} value={num} className="bg-gray-800 text-white">
                {num} items
              </option>
            ))}
          </select>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UrlFetcher;