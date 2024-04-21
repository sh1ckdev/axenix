import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MapComponent from './Map';
import Logo from '../assets/logo.svg'
import { Typography } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InventoryIcon from '@mui/icons-material/Inventory';
import Dashboard from './Dashboard';
import Products from './Products';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [inventories, setInventories] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGetProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/products');
      const data = await response.json();
      const responseInvent = await fetch('http://127.0.0.1:5000/inventories');
      const dataInvent = await responseInvent.json();
      setProducts(data);
      setInventories(dataInvent);
      console.log(dataInvent)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleEditProduct = async (editedProduct) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/product/edit/${editedProduct.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });
      if (response.ok) {
        handleGetProducts();
      } else {
        throw new Error('Failed to edit product');
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/product/edit/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Обновление списка продуктов после успешного удаления
        handleGetProducts();
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex' }}
    >   
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
         <img src={Logo} alt="" width="50px" style={{margin: 20}} />
         <Box
          sx={{ display: "flex", gap: 5, alignItems: "center", pb: 3 }}
        >
          {" "}
          <Typography variant="h5" fontWeight={600} textAlign={"right"}>
            Dashboard
          </Typography>
        </Box>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider',  minWidth: "25vh" }}
      >
        <Tab sx={{ fontWeight: 700, fontSize: 16, display: "flex", flexDirection: "row", gap: 1, justifyContent: 'flex-end' }} label={<><MapIcon /> Map</>}  {...a11yProps(0)} />
        <Tab sx={{  fontWeight: 700, fontSize: 16, display: "flex", flexDirection: "row", gap: 1, justifyContent: 'flex-end' }} label={<><AnalyticsIcon /> Panel</>} {...a11yProps(1)}/>
        <Tab onClick={handleGetProducts} sx={{  fontWeight: 700, fontSize: 16, display: "flex", flexDirection: "row", gap: 1, justifyContent: 'flex-end' }} label={<><InventoryIcon /> Products</>} {...a11yProps(2)} />
      </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MapComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error.message}</Typography>
        ) : (
          <Products products={products} inventories={inventories} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        )}
      </TabPanel>

    </Box>
  );
}
