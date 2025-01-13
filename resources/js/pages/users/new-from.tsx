import { useForm, SubmitHandler } from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {RadioGroup} from "@radix-ui/react-dropdown-menu";
// import { Input, Textarea, RadioGroup, Checkbox, Select, Button } from "@/components/ui";

type FormData = {
    username: string;
    email: string;
    bio: string;
    gender: string;
    agreeToTerms: boolean;
    skills: string[];
    profilePicture: FileList;
};

export default function BeautifulForm() {
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username</label>
                <Input {...register("username", { required: "Username is required" })} />
                {errors.username && <span>{errors.username.message}</span>}
            </div>

            <div>
                <label>Email</label>
                <Input type="email" {...register("email", { required: "Email is required" })} />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
                <label>Bio</label>
                <Textarea {...register("bio")} />
            </div>

            <div>
                <label>Gender</label>
                <RadioGroup {...register("gender", { required: "Please select your gender" })}>
                    <label>
                        <input type="radio" value="male" /> Male
                    </label>
                    <label>
                        <input type="radio" value="female" /> Female
                    </label>
                </RadioGroup>
                {errors.gender && <span>{errors.gender.message}</span>}
            </div>

            <div>
                <label>Agree to Terms</label>
                <Checkbox {...register("agreeToTerms", { required: "You must agree to the terms" })} />
                {errors.agreeToTerms && <span>{errors.agreeToTerms.message}</span>}
            </div>

            <div>
                <label>Skills</label>
                <Select {...register("skills")} multiple>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="css">CSS</option>
                </Select>
            </div>

            <div>
                <label>Profile Picture</label>
                <input type="file" {...register("profilePicture")} />
            </div>

            <Button type="submit">Submit</Button>
        </form>
    );
}
