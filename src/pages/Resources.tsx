import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  ExternalLink,
  Maximize2,
  Minimize2,
  Youtube,
} from "lucide-react";
import { resources } from "@/constants/ressourcesData";


export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

  const filteredResources = resources.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const toggleVideoExpansion = (videoId: string) => {
    setExpandedVideo(expandedVideo === videoId ? null : videoId);
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-background to-secondary/20">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Discrete Mathematics Resources
      </h1>

      <div className="mb-12">
        <div className="relative max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border-2 border-primary/50 focus:border-primary transition-colors duration-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50" />
        </div>
      </div>

      <Tabs
        defaultValue={resources[0].category.toLowerCase()}
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-8 flex-wrap">
          {resources.map((category) => (
            <TabsTrigger
              key={category.category}
              value={category.category.toLowerCase()}
              className="flex-grow sm:flex-grow-0 items-center px-6 py-3 m-1 rounded-full transition-all duration-300 hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.icon}
              <span className="ml-2">{category.category}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {filteredResources.map((category) => (
          <TabsContent
            key={category.category}
            value={category.category.toLowerCase()}
          >
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    category.category === "Video Courses" &&
                    expandedVideo === item.link
                      ? "col-span-full"
                      : ""
                  }`}
                >
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg font-semibold">
                        {item.title}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="rounded-full hover:bg-primary/20"
                      >
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${item.title} in new tab`}
                        >
                          {category.category === "Video Courses" ? (
                            <Youtube className="w-5 h-5 text-red-600" />
                          ) : (
                            <ExternalLink className="w-5 h-5" />
                          )}
                        </a>
                      </Button>
                    </CardTitle>
                    <CardDescription>{item.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {(category.category === "Books" ||
                      category.category === "Articles") && (
                      <div className="flex flex-col sm:flex-row items-center mb-4">
                        {/* <img
                          src={item.coverImage}
                          alt={`Cover of ${item.title}`}
                          width={category.category === "Books" ? 100 : 150}
                          height={category.category === "Books" ? 150 : 100}
                          className="object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
                        /> */}
                        <p className="flex-grow">{item.description}</p>
                      </div>
                    )}
                    {category.category === "Video Courses" && (
                      <div
                        className={`mt-4 ${
                          expandedVideo === item.link
                            ? "aspect-video"
                            : "aspect-video md:aspect-square"
                        }`}
                      >
                        <div className="relative w-full h-full">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${new URL(
                              item.link
                            ).searchParams.get("v")}`}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full opacity-80 hover:opacity-100"
                            onClick={() => toggleVideoExpansion(item.link)}
                          >
                            {expandedVideo === item.link ? (
                              <Minimize2 className="w-4 h-4" />
                            ) : (
                              <Maximize2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    {category.category === "Practice" && (
                      <p>{item.description}</p>
                    )}
                    {(category.category === "Books" ||
                      category.category === "Articles") && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4">Read Preview</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[80vh]">
                          <DialogHeader>
                            <DialogTitle>{item.title}</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-full">
                            <div className="p-6">
                              <h2 className="text-2xl font-bold mb-4">
                                {item.title}
                              </h2>
                              <h3 className="text-xl mb-4">{item.author}</h3>
                              <p className="mb-4">{item.description}</p>
                              {/* <p>{item.content}</p> */}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
