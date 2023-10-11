package br.com.gersis.loopback.modelo;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.strongloop.android.loopback.Model;
import com.strongloop.android.remoting.BeanUtil;
import org.json.JSONObject;


public class ItemCusto extends Model {


	private String nome;
	private double valor;
	private String imagem1;
	private String imagem2;
	private String imagem3;
	private String imagem4;
	private String imagem5;
	private String imagem6;
	// Relacionamentos 1
	private Experiencia Experiencia;
	// Relacionamentos N

	public JSONObject getJSON() {
		JSONObject obj = new JSONObject();
		try {
			obj.put("id",getId());
			obj.put("nome", nome);
			obj.put("valor", valor);
			obj.put("imagem1", imagem1);
			obj.put("imagem2", imagem2);
			obj.put("imagem3", imagem3);
			obj.put("imagem4", imagem4);
			obj.put("imagem5", imagem5);
			obj.put("imagem6", imagem6);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}


	public void setNome(String valor) { 
		this.nome = valor;
	}
	public String getNome() { 
		return this.nome;
	}
	public void setValor(double valor) { 
		this.valor = valor;
	}
	public double getValor() { 
		return this.valor;
	}
	public void setImagem1(String valor) { 
		this.imagem1 = valor;
	}
	public String getImagem1() { 
		return this.imagem1;
	}
	public void setImagem2(String valor) { 
		this.imagem2 = valor;
	}
	public String getImagem2() { 
		return this.imagem2;
	}
	public void setImagem3(String valor) { 
		this.imagem3 = valor;
	}
	public String getImagem3() { 
		return this.imagem3;
	}
	public void setImagem4(String valor) { 
		this.imagem4 = valor;
	}
	public String getImagem4() { 
		return this.imagem4;
	}
	public void setImagem5(String valor) { 
		this.imagem5 = valor;
	}
	public String getImagem5() { 
		return this.imagem5;
	}
	public void setImagem6(String valor) { 
		this.imagem6 = valor;
	}
	public String getImagem6() { 
		return this.imagem6;
	}

	public Experiencia getExperiencia() {
		return Experiencia;
	}
	public void setExperiencia(HashMap valor) {
		this.Experiencia = new Experiencia();
		BeanUtil.setProperties(this.Experiencia, (Map<String, ? extends Object>) valor, true);
	}
}
