package mk.server.rentacar.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;

public class CarImageScraper {
    public static String getImageLink(String brand, String model) {
        String carName = (brand + "+" + model).trim().replace(" ", "+");
        String searchUrl = "https://commons.wikimedia.org/w/index.php?search=" + carName + "&title=Special:MediaSearch&go=Go&type=image";

        try {
            Document document = Jsoup.connect(searchUrl).get();
            Element imageElement = document.getElementsByClass("sd-image").get(0);

            return imageElement.absUrl("src");
        } catch (IndexOutOfBoundsException | IOException e) {
            return null;
        }
    }
}
