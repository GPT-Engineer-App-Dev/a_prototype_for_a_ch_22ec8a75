import React, { useState } from "react";
import { Box, VStack, HStack, Text, Textarea, Button, Image, IconButton, Select, Checkbox, Heading, useColorMode } from "@chakra-ui/react";
import { FaPaperPlane, FaMicrophone, FaCog, FaCloudUploadAlt, FaCloudDownloadAlt, FaPrint } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1527430253228-e93688616381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHJvYm90JTIwYXZhdGFyfGVufDB8fHx8MTcwOTgwMjQ1MXww&ixlib=rb-4.0.3&q=80&w=1080");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const sendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText("");
    }
  };

  return (
    <Box p={4} bg={colorMode === "light" ? "gray.100" : "gray.900"} minH="100vh">
      <Heading mb={4}>ChatGPT-4 Desktop App</Heading>
      <HStack spacing={4} alignItems="start">
        <VStack flex={1} spacing={4} alignItems="stretch">
          <Box flex={1} borderWidth={1} borderRadius="md" p={4} overflowY="auto">
            {messages.map((msg, index) => (
              <Text key={index} bg={msg.sender === "user" ? "blue.100" : "gray.100"} p={2} borderRadius="md">
                {msg.text}
              </Text>
            ))}
          </Box>
          <HStack>
            <Textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type your message..." resize="none" flex={1} />
            <IconButton icon={<FaPaperPlane />} onClick={sendMessage} />
            <IconButton icon={<FaMicrophone />} onClick={() => setVoiceEnabled(!voiceEnabled)} />
          </HStack>
        </VStack>
        <VStack spacing={4} alignItems="center">
          <Box borderWidth={1} borderRadius="full" p={2}>
            <Image src={avatarUrl} alt="Avatar" boxSize="150px" borderRadius="full" />
          </Box>
          <Button leftIcon={<FaCloudUploadAlt />}>Upload Avatar</Button>
          <Checkbox isChecked={voiceEnabled} onChange={(e) => setVoiceEnabled(e.target.checked)}>
            Enable Voice
          </Checkbox>
        </VStack>
      </HStack>
      <HStack mt={8} spacing={4}>
        <Select placeholder="Download Chat">
          <option value="docx">.docx</option>
          <option value="pdf">.pdf</option>
          <option value="txt">.txt</option>
          <option value="csv">.csv</option>
        </Select>
        <IconButton icon={<FaCloudDownloadAlt />} />
        <IconButton icon={<FaPrint />} />
        <IconButton icon={<FaCog />} onClick={toggleColorMode} />
      </HStack>
    </Box>
  );
};

export default Index;
