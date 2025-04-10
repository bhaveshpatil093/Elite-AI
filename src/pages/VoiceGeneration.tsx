
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OutputDisplay from "@/components/OutputDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import { elevenLabsService } from "@/services/elevenLabsService";
import { toast } from "sonner";
import { Mic, Play, Pause } from "lucide-react";

interface VoiceOption {
  id: string;
  name: string;
}

const VoiceGeneration = () => {
  const [text, setText] = useState("");
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [selectedVoice, setSelectedVoice] = useState("EXAVITQu4vr4xnSDxMaL"); // Default to Sarah
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Pre-defined voices (in a real app, these would be fetched from the API)
  const voices: VoiceOption[] = [
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
    { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },
    { id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
    { id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte" },
    { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice" },
  ];

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setIsLoading(true);
    setAudioUrl("");

    try {
      const response = await elevenLabsService.generateSpeech({
        text,
        voiceId: selectedVoice,
        stability,
        similarity,
      });
      setAudioUrl(response);
    } catch (error) {
      console.error("Error generating voice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-glass p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Voice Generation</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="text">Text to Convert</Label>
            <Textarea
              id="text"
              placeholder="Enter the text you want to convert to speech..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="voice">Voice</Label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger id="voice">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="stability">
                Stability: {stability.toFixed(2)}
              </Label>
              <Slider
                id="stability"
                min={0}
                max={1}
                step={0.01}
                value={[stability]}
                onValueChange={(value) => setStability(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Higher values prevent voice cracking but can make it sound flatter.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="similarity">
                Similarity: {similarity.toFixed(2)}
              </Label>
              <Slider
                id="similarity"
                min={0}
                max={1}
                step={0.01}
                value={[similarity]}
                onValueChange={(value) => setSimilarity(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Higher values make the output voice more similar to the selected voice.
              </p>
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !text.trim()}
            className="w-full"
          >
            <Mic className="mr-2 h-4 w-4" />
            Generate Voice
          </Button>
        </div>
      </div>

      {/* Results Section */}
      {isLoading ? (
        <LoadingSpinner text="Generating voice..." />
      ) : audioUrl ? (
        <OutputDisplay 
          title="Generated Voice" 
          contentType="audio"
          content={audioUrl}
          fileName="generated-voice"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-secondary/50 backdrop-blur-sm w-full p-4 rounded-lg">
              <audio 
                ref={audioRef}
                src={audioUrl} 
                onEnded={handleAudioEnded}
                className="hidden"
              />
              <Button 
                onClick={togglePlayPause} 
                variant="outline"
                className="mx-auto block"
              >
                {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Click the button to play/pause or use the download button below to save the audio.
            </p>
          </div>
        </OutputDisplay>
      ) : null}
    </div>
  );
};

export default VoiceGeneration;
