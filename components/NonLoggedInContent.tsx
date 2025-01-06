import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote as QuoteIcon, ArrowRight } from "lucide-react";

export const NonLoggedInContent = () => {
  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">Welcome to ThoughtFlow</h1>
        <p className="text-2xl mb-6">
          Share your thoughts and discover inspiring quotes from others.
        </p>
        <Button size="lg" className="w-30 text-xl m-3">
          Get Started
        </Button>
      </section>

      <section className="mb-12 mx-50 max-w-5xl mx-auto">
        <Card className="bg-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <QuoteIcon className="mr-2 " />
              <span className="text-2xl font-semibold">Featured Quote</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="italic text-3xl">
              &quot;The only way to do great work is to love what you do.&quot;
            </blockquote>
            <p className="text-right mt-2 text-xl">- Steve Jobs</p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How ThoughtFlow Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl">
                Share your own inspirational quotes or thoughts with the
                community.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Discover</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl">
                Explore a vast collection of quotes from various authors and
                users.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Engage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl">
                Like, comment, and save your favorite quotes to revisit later.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to start your journey?
        </h2>
        <p className="mb-6">
          Join ThoughtFlow today and become part of a community that values
          inspiration and creativity.
        </p>
        <Button size="lg" className="group w-30 text-xl m-3">
          Join Now
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </section>
    </div>
  );
};
