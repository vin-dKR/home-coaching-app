import "../global.css"
import { Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-black">
            <Text className="text-white text-2xl font-[20px]">Hello Tailwind!</Text>
        </View>
    );
}

