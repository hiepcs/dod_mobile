import React from 'react';
import { Dimensions } from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { VictoryBar } from "victory-native";
const screenWidth = Dimensions.get("window").width;

const dataLine = {
    labels: ["January", "February", "March", "April", "May", "June"],
    dataset: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
};

const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
};

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    stroke: 2,
    barPercentage: 0.5
};

class ProfitChart extends React.Component {
    constructor(props) {
        super(props);
    }

    // render() {
    //     return (<LineChart
    //         data={data}
    //         width={screenWidth}
    //         height={256}
    //         verticalLabelRotation={30}
    //         chartConfig={chartConfig}
    //         bezier
    //     />)
    // }

    // render() {
    //     return (
    //         <View>
    //             <LineChart
    //                 data={dataLine}
    //                 width={screenWidth}
    //                 height={220}
    //                 chartConfig={chartConfig}
    //             />
    //             <ProgressChart
    //                 data={data}
    //                 width={screenWidth}
    //                 height={220}
    //                 chartConfig={chartConfig}
    //                 hideLegend={false}
    //             />
    //         </View>
    //     )
    // }

    render() {
        return (
            <>
                <VictoryBar />
            </>
        )
    }
}

export default ProfitChart