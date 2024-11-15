package mk.server.rentacar.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class CarImageScraper {
    public static String getImageLink(String brand, String model) {
        String searchUrl = "https://unsplash.com/s/photos/" + brand + "-" + model + "?license=free&orientation=landscape";

        try {
            Document document = Jsoup.connect(searchUrl).get();
            Element imageElement = document.getElementsByClass("I7OuT DVW3V L1BOa").get(0);

            TimeUnit.SECONDS.sleep(5);

            return imageElement.absUrl("src");
        } catch (IndexOutOfBoundsException | IOException e) {
            return null;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
