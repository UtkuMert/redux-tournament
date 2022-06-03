import { useState } from "react";
import {
  Drawer,
  Button,
  Group,
  TextInput,
  Checkbox,
  Box,
  PasswordInput,
} from "@mantine/core";
import Background from "../img/top.jpg";
import { useForm } from "@mantine/form";
export const Home = () => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      userName: "",
      password: "",
    },

    validate: {
      userName: (value) =>
        value.length > 1 ? null : "User Name must be least 2 character",
        password: (value) =>
        value.length > 5 ? null : "Password must be least 6 character",
    },
  });
  return (
    <>
      <>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title="Register"
          padding="xl"
          size="xl"
        >
          <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                placeholder="Your name"
                label="Full name"
                size="md"
                required
                {...form.getInputProps("userName")}
              />

              <PasswordInput
                placeholder="Password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                required
                {...form.getInputProps("password")}
              />

              <Group position="right" mt="md">
                <button type="submit">Register</button>
              </Group>
            </form>
          </Box>
        </Drawer>
      </>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              TURNUVAMVAR'A HOŞGELDİNİZ
            </h1>
            <p className="mb-5">
              Futbol tutkunlarının vazgeçilmez adresi TURNUVAMVAR. Kolaylıkla
              turnuva düzenleyebilir, turnuvayı yönetebilir ve turnuvanın
              gidişatını sitemiz üzerinden takip edebilirsiniz.
            </p>
            <button onClick={() => setOpened(true)} className="btn btn-primary">
              KAYIT OL
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
