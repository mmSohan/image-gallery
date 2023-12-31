import logo from './logo.svg';
import './App.css';
import ImageGallery from './components/ImageGallery';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
      <ImageGallery/>
      </DndProvider>
    </div>
  );
}

export default App;
