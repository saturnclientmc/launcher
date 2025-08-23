import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Settings, User } from "lucide-react";
import { authenticate, launchMinecraft, listAccounts } from "./lib/launcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";

export default function App() {
  const [version, setVersion] = useState("1.21.4");
  const [accounts, setAccounts] = useState<string[]>([]);
  const [account, setAccount] = useState<string | undefined>();

  useEffect(() => {
    listAccounts().then((a) => {
      setAccounts(a);
      setAccount(a[0]);
    });
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 bg-center bg-cover" style={{ backgroundImage: "url('/boliviainteligente-ry7YdbD5gIA-unsplash.jpg')" }}>
      <Card className="w-[480px] shadow-2xl rounded-2xl border border-zinc-700 bg-zinc-900/80 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Saturn Client Launcher
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="play" className="w-full">
            <TabsList className="grid grid-cols-3 w-max mx-auto">
              <TabsTrigger value="play">Play</TabsTrigger>
              <TabsTrigger value="auth">Accounts</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="play" className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <Select defaultValue="1.21.4" onValueChange={setVersion}>
                  <SelectTrigger className="w-[180px w-full">
                    <SelectValue placeholder="Version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.21.4">1.21.4</SelectItem>
                  </SelectContent>
                </Select>
                <Button disabled={!account}
                  onClick={() => {
                    if (!account) return;
                    launchMinecraft(account, version);
                  }}
                  className="w-full font-bold text-lg flex items-center gap-2"
                ><Play /> Launch</Button>
              </div>
            </TabsContent>

            <TabsContent value="auth" className="space-y-4">
              <Select defaultValue={account}>
                <SelectTrigger className="w-[180px w-full">
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((a) => (
                    <SelectItem value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  authenticate();
                }}
                className="w-full font-bold text-lg flex items-center gap-2"
              ><User /> Authenticate</Button>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">
                  RAM Allocation (MB)
                </label>
                <Input placeholder="2048" className="bg-zinc-800 border-zinc-700" />
              </div>
              <Button className="w-full flex items-center gap-2">
                <Settings className="w-5 h-5" /> Save Settings
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}