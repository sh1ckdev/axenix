import { Box, Typography } from '@mui/material';
import { PieChart, BarChart, Gauge, gaugeClasses } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    // const theme = useTheme();
    const [salesData, setSalesData] = useState([]);
    const [marketData, setMarketData] = useState([]);
    const chartSetting = {
        yAxis: [{ label: 'Quantity Sold' }],
        height: 300,
    };
    const chartSetting2 = {
        yAxis: [{ label: 'Coefficient' }],
        height: 300,
    };

    useEffect(() => {
        const handleGetRequest = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/sales');
                const data = await response.json();

                if (Array.isArray(data)) {
                    const formattedData = data.map(sale => ({
                        sale_date: formatDate(new Date(sale.sale_date)),
                        quantity_sold: sale.quantity_sold
                    }));

                    setSalesData(formattedData);
                } else {
                    console.error('Invalid data format: expected an array of objects');
                }
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        const formatDate = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${day}.${month}`;
        };

        handleGetRequest();
    }, []);

    useEffect(() => {
        const handleGet = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/markettrends');
                const data2 = await response.json();

                if (Array.isArray(data2)) {
                    const formattedData2 = data2.map(trend => ({
                        x: `${formatDate(new Date(trend.start_date))} - ${formatDate(new Date(trend.end_date))}`,
                        y: trend.trend_coefficient
                    }));

                    setMarketData(formattedData2);
                    console.log(formattedData2);
                } else {
                    console.error('Invalid data format: expected an array of objects');
                }
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        const formatDate = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${day}.${month}`;
        };

        handleGet();
    }, []);



    const data = [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 150, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
    ];
    const colors = ['#141318', '#FF8354', '#ffffff'];
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, m: 5, width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '45.5%', height: '350px', backgroundColor: "#393939", borderRadius: 5, boxShadow: `1px 3px 7px #555555` }}>
                        <Typography sx={{ pt: 3, pl: 3, fontSize: 20, fontWeight: 600 }}>График</Typography>
                        <PieChart
                            series={[{
                                data: data,
                                innerRadius: 65,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 180,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 40, additionalRadius: -30, color: 'gray' },
                            }
                            ]}
                            colors={colors}
                            sx={{
                                '& .css-1mhcdve-MuiPieArc-root': {
                                    stroke: 'none',
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '45%', height: '350px', backgroundColor: "#393939", borderRadius: 5, boxShadow: `1px 3px 7px #555555` }}>
                        <Typography sx={{ pt: 3, pl: 3, fontSize: 20, fontWeight: 600 }}>График</Typography>
                        <BarChart
                            dataset={salesData}
                            xAxis={[{ scaleType: 'band', dataKey: 'sale_date' }]}
                            series={[{ dataKey: 'quantity_sold', label: 'Quantity Sold' }]}
                            grid={{ horizontal: true }}
                            sx={{
                                [`& .${axisClasses.left} .${axisClasses.label}`]: {
                                    transform: 'translateX(-10px)',
                                },
                                [`& .${chartsGridClasses.line}`]: { strokeDasharray: '5 3', strokeWidth: 2 },
                            }}
                            {...chartSetting}
                            colors={['#FF8354']}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, m: 5, width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '22%', height: '350px', backgroundColor: "#393939", borderRadius: 5, boxShadow: `1px 3px 7px #555555` }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 600, mt: 3 }}>График</Typography>
                        <Gauge
                            {...{ width: 150, height: 150, value: 50 }}
                            cornerRadius="50%"
                            sx={(theme) => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#FF835',
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: theme.palette.text.disabled,
                                },
                            })}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '22%', height: '350px', backgroundColor: "#393939", borderRadius: 5, boxShadow: `1px 3px 7px #555555` }}>
                        <Typography sx={{ fontSize: 20, fontWeight: 600, mt: 3 }}>График</Typography>
                        <Gauge
                            {...{ width: 150, height: 150, value: 72 }}
                            cornerRadius="50%"
                            sx={(theme) => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: '#FF835',
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: theme.palette.text.disabled,
                                },
                            })}
                        />

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '45%', height: '350px', backgroundColor: "#393939", borderRadius: 5, boxShadow: `1px 3px 7px #555555` }}>
                        <Typography sx={{ pt: 3, pl: 3, fontSize: 20, fontWeight: 600 }}>График</Typography>

                        <BarChart
                            dataset={marketData}
                            xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
                            series={[{ dataKey: 'y', label: 'Trend Coefficient' }]}
                            grid={{ horizontal: true }}
                            sx={{
                                [`& .${axisClasses.left} .${axisClasses.label}`]: {
                                    transform: 'translateX(-10px)',
                                },
                                [`& .${chartsGridClasses.line}`]: { strokeDasharray: '5 3', strokeWidth: 2 },
                            }}
                            {...chartSetting2}
                            colors={['#FF8354']}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Dashboard
