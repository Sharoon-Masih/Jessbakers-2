import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ContactCard({ Click }: { Click: (val: any) => void }) {
    return (
        <Card className=" sm:w-[350px]">
            <CardHeader>
                <CardDescription>Fill the form below</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4 text-[#272727]">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your Name" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="email" />
                        </div>
                        <div>
                            <Label htmlFor="email">Contact No</Label>
                            <Input id="email" placeholder="+92" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => { Click((prev: any) => !prev) }}> Cancel</Button>
                <Button className="bg-[#4A1D1F]" onClick={() => { Click((prev: any) => !prev) }}    >Submit</Button>
            </CardFooter>
        </Card>
    )
}
