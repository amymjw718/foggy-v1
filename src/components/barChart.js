import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { collection, onSnapshot } from "firebase/firestore";
import { data } from "autoprefixer";
// import Todos from "./Todos";

    const VulnChart = () => {
        const [posts, setPosts] = useState([]);
        const {data:session} = useSession();

        useEffect(()=>{
            const unsubscribe = onSnapshot(
                collection(db, "posts"), (snapshot) => {
                    setPosts(snapshot.docs)
                }
            )
        }, [db])

        var Monday = 0;
        var Tuesday = 0;
        var Wednesday = 0;
        var Thursday = 0;
        var Friday = 0;
        var Saturday = 0;
        var Sunday = 0;
        const currentDate = new Date();
        const lastWeekDate = new Date();

        const dayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, and so on

        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Sunday
        const firstDateOfWeek = new Date(currentDate);
        firstDateOfWeek.setDate(currentDate.getDate() - daysToSubtract);

        lastWeekDate.setDate(currentDate.getDate() - 7);

        posts.map((p)=>{
            const date = p.data().timestamp.toDate();
            console.log(date);
            date.getDay() === 0 && firstDateOfWeek >= lastWeekDate && firstDateOfWeek <= currentDate && Sunday++;
            date.getDay() === 1 && firstDateOfWeek >= lastWeekDate && firstDateOfWeek <= currentDate && Monday++;
            date.getDay() === 2 && firstDateOfWeek >= lastWeekDate && firstDateOfWeek <= currentDate && Tuesday++;
            date.getDay() === 3 && firstDateOfWeek >= lastWeekDate && firstDateOfWeek <= currentDate && Wednesday++;
            date.getDay() === 4 && firstDateOfWeek >= lastWeekDate && firstDateOfWeek <= currentDate && Thursday++;
            date.getDay() === 5 && firstDateOfWeek >= lastWeekDate && firstDateOfWeek <= currentDate && Friday++;
            date.getDay() === 6 && firstDateOfWeek >= lastWeekDate && firstDateOfWeek <= currentDate && Saturday++;
        })

      return (
        <div>
          <Bar
            data={{
              labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              datasets: [
                {
                  label: "Last weeks posts number",
                  data: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday],
                  backgroundColor: ["red", "yellow", "blue", "black", "green", "skyblue", "pink"],
                  borderWidth: 5
                },
              ]
            }}
            height={300}
            width={500}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      );
    };
export default VulnChart;
