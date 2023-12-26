import { useContext, useEffect, useState } from "react";
import Title from "../Hooks/Title";
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";

const Stat = () => {

    const { user } = useContext(AuthContext)
    const [totalFood, setTotalFood] = useState([])
    const [myFood, setMyFood] = useState([])

    useEffect(() => {
        axios.get(`https://hungry-explorer-server.vercel.app/api/v1/find?email=${user?.email}`, { withCredentials: true })
            .then(res => {
                setMyFood(res.data)
            })
    }, [user])
    useEffect(() => {
        axios.get('https://hungry-explorer-server.vercel.app/api/v1/all-foods')
            .then(res => {
                setTotalFood(res.data.total)
            })
    }, [])

    console.log(totalFood, myFood.length)

    const myAdded = myFood.length
    const percentage = (myAdded / totalFood) * 100;

    const data = [
        { name: 'Total item', value: totalFood, percentage: 100 },
        { name: 'Your Added items', value: myAdded, percentage: percentage },
    ];

    const COLORS = ['orange', 'red',];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-4/5 mx-auto h-screen ">
            <div className="mt-10">
                <Title>Statistic</Title>
            </div>

            <div className="flex justify-center">
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Legend />
                        <Tooltip />

                    </PieChart>
                </div>
            </div>

        </div>
    );
};

export default Stat;