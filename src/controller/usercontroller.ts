import connectToDatabase from "@/db/db";
import User from "@/models/user";

const getData = async (email: string) => {
  await connectToDatabase();
  const data = await User.findOne({ email: email });
  return data;
};

const updateData = async (email: string, data: any) => {
  await connectToDatabase();
  const updatedData = await User.findOneAndUpdate(
    { email: email },
    { data: data }
  );
  return updatedData;
};

export { getData, updateData };
