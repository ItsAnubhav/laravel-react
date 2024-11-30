import AuthenticatedLayout from "@/layouts/authenticated-layout";
import DeleteUserForm from "@/pages/profile/partials/delete-user-form";
import UpdatePasswordForm from "@/pages/profile/partials/update-password-form";
import UpdateProfileInformationForm from "@/pages/profile/partials/update-profile-information-form";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { User } from "@/types";
import { Form } from "@/components/ui/form";
import { FormEventHandler } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Button } from "@/components/ui/button";
import { Transition } from "@headlessui/react";

export default function Edit({
    user,
}: { user?: User }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <AuthenticatedLayout
            header={'Edit Profile'}
        >
            <Head title="Profile" />
            <section>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div className="flex w-8/12 space-x-4">
                        <div className="flex-1">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                className="mt-1 block w-full"
                                value={user?.first_name}
                                onChange={(e) => setData("first_name", e.target.value)}
                                required
                                autoComplete="first_name"
                            />
                            <InputError className="mt-2" message={errors.first_name} />
                        </div>

                        <div className="flex-1">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                className="mt-1 block w-full"
                                value={user?.last_name}
                                onChange={(e) => setData("last_name", e.target.value)}
                                required
                                autoComplete="last_name"
                            />
                            <InputError className="mt-2" message={errors.last_name} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}
