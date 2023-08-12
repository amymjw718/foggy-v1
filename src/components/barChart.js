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

        // const currentDate = new Date();
        // const lastWeekDate = new Date();

        // const dayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, and so on

        // const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Sunday
        // const firstDateOfWeek = new Date(currentDate);
        // firstDateOfWeek.setDate(currentDate.getDay() - daysToSubtract);

        // lastWeekDate.setDate(currentDate.getDate() - 7);
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, and so on

        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Sunday
        const firstDateOfWeek = new Date(currentDate);
        firstDateOfWeek.setDate(currentDate.getDate() - daysToSubtract);

        // console.log(firstDateOfWeek);

        const lastWeekDate = new Date();
        lastWeekDate.setDate(firstDateOfWeek.getDate() - 7);

        console.log(lastWeekDate)



        posts.map((p)=>{
            const date = p.data().timestamp.toDate();
            // console.log(date);
            p.data().uid === session?.user.uid && date.getDay() === 0 && date >= lastWeekDate && date <= currentDate && Sunday++;
            p.data().uid === session?.user.uid && date.getDay() === 1 && date >= lastWeekDate && date <= currentDate && Monday++;
            p.data().uid === session?.user.uid && date.getDay() === 2 && date >= lastWeekDate && date <= currentDate && Tuesday++;
            p.data().uid === session?.user.uid && date.getDay() === 3 && date >= lastWeekDate && date <= currentDate && Wednesday++;
            p.data().uid === session?.user.uid && date.getDay() === 4 && date >= lastWeekDate && date <= currentDate && Thursday++;
            p.data().uid === session?.user.uid && date.getDay() === 5 && date >= lastWeekDate && date <= currentDate && Friday++;
            p.data().uid === session?.user.uid && date.getDay() === 6 && date >= lastWeekDate && date <= currentDate && Saturday++;
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
                  backgroundColor: ["red", "yellow", "blue", "gray", "green", "skyblue", "pink"],
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
