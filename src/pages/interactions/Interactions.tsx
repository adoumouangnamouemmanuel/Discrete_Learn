"use client";

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InteractiveVennDiagram from "./InteractiveVennDiagram";
import TableOfOperations from "./TableOfOperations";
import ComputerRepresentation from "./ComputerRepresentation";
import VennDiagram from "./VennDiagram";
import SetIdentityPractice from "./SetIdentityPractice";

export default function DiscreteSetTheory() {
  const [activeSet, setActiveSet] = useState<
    | "union"
    | "intersection"
    | "difference"
    | "complement"
    | "symmetric_difference"
  >("union");
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Discrete Mathematics: Set Theory
      </h1>
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concepts">Basic Concepts</TabsTrigger>
          <TabsTrigger value="operations">Set Operations</TabsTrigger>
          <TabsTrigger value="identities">Set Identities</TabsTrigger>
          <TabsTrigger value="computer">Computer Representation</TabsTrigger>
        </TabsList>
        <TabsContent value="concepts">
          <Card>
            <CardHeader>
              <CardTitle>Basic Set Concepts</CardTitle>
              <CardDescription>
                Learn about fundamental set types and their properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="universal">
                  <AccordionTrigger>Universal Set</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>
                          The universal set, often denoted by U, is the set of
                          all elements under consideration.
                        </p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="universal" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="singleton">
                  <AccordionTrigger>Singleton Set</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>
                          A singleton set is a set containing exactly one
                          element.
                        </p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="singleton" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="disjoint">
                  <AccordionTrigger>Disjoint Sets</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>
                          Two sets are disjoint if they have no elements in
                          common.
                        </p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="disjoint" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="operations">
          <Card>
            <CardHeader>
              <CardTitle>Set Operations</CardTitle>
              <CardDescription>
                Explore different set operations with interactive Venn diagrams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-4">
                <Button onClick={() => setActiveSet("union")}>Union</Button>
                <Button onClick={() => setActiveSet("intersection")}>
                  Intersection
                </Button>
                <Button onClick={() => setActiveSet("difference")}>
                  Difference
                </Button>
                <Button onClick={() => setActiveSet("complement")}>
                  Complement
                </Button>
                <Button onClick={() => setActiveSet("symmetric_difference")}>
                  Symmetric Difference
                </Button>
              </div>
              <InteractiveVennDiagram operation={activeSet} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="identities">
          <Card>
            <CardHeader>
              <CardTitle>Set Identities and Laws</CardTitle>
              <CardDescription>
                Learn about important set identities and laws
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="commutative">
                  <AccordionTrigger>Commutative Laws</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>A ∪ B = B ∪ A</p>
                        <p>A ∩ B = B ∩ A</p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="commutative" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="associative">
                  <AccordionTrigger>Associative Laws</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>(A ∪ B) ∪ C = A ∪ (B ∪ C)</p>
                        <p>(A ∩ B) ∩ C = A ∩ (B ∩ C)</p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="associative" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="distributive">
                  <AccordionTrigger>Distributive Laws</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</p>
                        <p>A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="distributive" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="demorgan">
                  <AccordionTrigger>De Morgan's Laws</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>(A ∪ B)' = A' ∩ B'</p>
                        <p>(A ∩ B)' = A' ∪ B'</p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="demorgan" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="idempotent">
                  <AccordionTrigger>Idempotent Laws</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>A ∪ A = A</p>
                        <p>A ∩ A = A</p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="idempotent" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="negation">
                  <AccordionTrigger>Negation Laws</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/2 p-4">
                        <p>A ∪ A' = U</p>
                        <p>A ∩ A' = ∅</p>
                      </div>
                      <div className="w-full md:w-1/2">
                        <VennDiagram type="negation" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Practice Set Identities</CardTitle>
              <CardDescription>
                Use the operations table to practice set identities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SetIdentityPractice />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="computer">
          <Card>
            <CardHeader>
              <CardTitle>Computer Representation of Sets</CardTitle>
              <CardDescription>
                Explore how sets are represented in computer memory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComputerRepresentation />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Table of Operations</CardTitle>
          <CardDescription>
            Drag and drop to complete the table of set operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TableOfOperations />
        </CardContent>
      </Card>
    </div>
  );
}
