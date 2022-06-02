import React from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const CardShow = ({ parameter }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (parameter?.description) {
      navigate(`/tournaments/${parameter.id}`);
    } else {
      navigate(`/teams/${parameter.id}`);
    }
  };
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: "auto" }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image
            src="https://api.lorem.space/image/shoes?w=400&h=225"
            alt="Shoes"
            height={160}
          />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{parameter?.name}</Text>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {parameter?.description ? parameter?.description : ""}
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          onClick={handleButtonClick}
        >
         {parameter?.description ? 'Turnuva Detay' : 'Takim Detayi'}
        </Button>
      </Card>
    </div>
  );
};
