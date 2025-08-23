import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Play, Settings, User } from "lucide-react";
import { invoke } from '@tauri-apps/api/core';

export default function App() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
      <Card className="w-[480px] shadow-2xl rounded-2xl border border-zinc-700 bg-zinc-900/80 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Saturn Client Launcher
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="play" className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="play">Play</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Play Tab */}
            <TabsContent value="play" className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={() => {
                    invoke('authenticate')
                  }}
                  className="w-full font-bold text-lg flex items-center gap-2"
                >Auth</Button>
              </div>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Username</label>
                <Input placeholder="Enter your username" className="bg-zinc-800 border-zinc-700" />
              </div>
              <Button className="w-full flex items-center gap-2">
                <User className="w-5 h-5" /> Login
              </Button>
              <Button variant="destructive" className="w-full flex items-center gap-2">
                <LogOut className="w-5 h-5" /> Logout
              </Button>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">
                  Java Path
                </label>
                <Input placeholder="/usr/bin/java" className="bg-zinc-800 border-zinc-700" />
              </div>
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