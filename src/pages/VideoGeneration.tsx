
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Film } from "lucide-react";

const VideoGeneration = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-glass p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Video Generation</h1>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Describe the video you want to generate..."
              className="min-h-[120px]"
              disabled
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="duration">
                Duration: 10 seconds
              </Label>
              <Slider
                id="duration"
                min={5}
                max={30}
                step={1}
                value={[10]}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">
                Quality: Medium
              </Label>
              <Slider
                id="quality"
                min={1}
                max={3}
                step={1}
                value={[2]}
                disabled
              />
            </div>
          </div>

          <Button 
            onClick={() => toast.info("Video generation will be available soon!")} 
            className="w-full"
          >
            <Film className="mr-2 h-4 w-4" />
            Generate Video
          </Button>
        </div>
      </div>

      <div className="card-glass p-6 rounded-xl text-center">
        <h2 className="text-xl font-semibold mb-2">Coming Soon!</h2>
        <p className="text-muted-foreground">
          Video generation capabilities are under development and will be available in a future update.
        </p>
      </div>
    </div>
  );
};

export default VideoGeneration;
